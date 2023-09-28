import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendRequest } from "../../config/request";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import SellerCalendar from "../../components/SellerCalendar";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [selectedImage, setSelectedImage] = useState("img1");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await sendRequest({ method: "GET", route: `guest/properties/${id}` });
        setProperty(response);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleImageClick = (imageKey) => {
    setSelectedImage(imageKey);
  };

  const navigateImage = (direction) => {
    const images = ["img1", "img2", "img3"];
    const currentIndex = images.indexOf(selectedImage);
    let newIndex = currentIndex;

    if (direction === "left") {
      newIndex = (newIndex - 1 + images.length) % images.length;
    } else if (direction === "right") {
      newIndex = (newIndex + 1) % images.length;
    }

    setSelectedImage(images[newIndex]);
  };
  if (!property) {
    return <div></div>;
  }

  return (
    <div className="container mx-auto max-w-screen-xl my-8 flex justify-between md:flex-row flex-col">
      <div className="md:w-7/12 mx-5 md:mx-0">
        <h2 className="text-3xl font-bold text-gray-800">{property.title}</h2>
        <div className='w-36 h-1 bg-gradient-to-r from-primary to-black mb-10 mt-3'></div>
        <div className="mt-4 flex">
          <img src={`${property[selectedImage]}`} alt={property.title} className="max-w-full h-auto flex-grow max-h-[28rem] object-cover"/>
        </div>
        <div className="mt-5">
          <div className="flex justify-center items-center space-x-4 overflow-x-auto">
            <div onClick={() => navigateImage("left")} className="w-12 h-12 rounded-full bg-primary flex items-center justify-center cursor-pointer">
              <FontAwesomeIcon icon={faChevronLeft} className="text-white" />
            </div>
            <img src={`${property.img1}`} onClick={() => handleImageClick("img1")} alt={property.title} className="flex-grow w-1/4 h-24 md:h-28 object-cover cursor-pointer" />
            <img src={`${property.img2}`} onClick={() => handleImageClick("img2")} alt={property.title} className="flex-grow w-1/4 h-24 md:h-28 object-cover cursor-pointer"/>
            <img src={`${property.img3}`} onClick={() => handleImageClick("img3")} alt={property.title} className="flex-grow w-1/4 h-24 md:h-28 object-cover cursor-pointer"/>
            <div onClick={() => navigateImage("right")} className="w-12 h-12 rounded-full bg-primary flex items-center justify-center cursor-pointer">
              <FontAwesomeIcon icon={faChevronRight} className="text-white" />
            </div>
          </div>
        </div>
        <div className="md:mt-20 mt-12">
          <div className='w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-4'></div>
          <p className="text-justify text-lg text-gray-700 md:mb-20 mb-12 font-medium leading-9">{property.description}</p>
          <div className="mt-4">
            <MapContainer center={[parseFloat(property.latitude), parseFloat(property.longitude)]} zoom={10} style={{ height: "500px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'/>
              <Marker position={[parseFloat(property.latitude), parseFloat(property.longitude)]}/>
            </MapContainer>
          </div>
        </div>
      </div>
      <div className="md:w-4/12 mx-5 md:mx-0">
        <div className="flex flex-col w-full">
          <h1 className="font-bold mt-20 text-xl text-secondary">Book a meeting with the seller</h1>
          <div className='w-28 h-1 bg-gradient-to-r from-primary to-black mb-5 mt-1'></div>
          <SellerCalendar seller={property.user} booked={property.meetings}/> </div>
        <div className="bg-primary p-6 flex flex-col gap-1.5 my-16 font-semibold text-gray-900 text-md">
          <h1 className="text-2xl mb-2 font-bold">Contact Information</h1>
          <p>Name: {property.user.name}</p>
          <p>Phone: {property.user.phone}</p>
          <p>Email: {property.user.email}</p>
        </div>
        <div className="bg-primary p-6 flex flex-col gap-1.5 font-semibold text-gray-900 text-md">
          <h1 className="text-2xl mb-2 font-bold">Brief Characteristics</h1>
          <p>Status: {property.status}</p>
          <p>City: {property.city.city}</p>
          <p>Area: {property.area} sqft</p>
          {property.type === "home" && property.home && (
            <div className="flex flex-col gap-1.5">
              <p>Rooms: {property.home.rooms_nb}</p>
              <p>Balconies: {property.home.balconies_nb}</p>
              <p>Bathrooms: {property.home.bathrooms_nb}</p>
              <p>Garages: {property.home.garages_nb}</p>
            </div>
          )}
          <p>Address: {property.address}</p>
          <p>Location: "{property.latitude}, {property.longitude}"</p>
        </div>
        <div className="bg-secondary font-bold text-white p-6 mt-16">
          <p>Price: <br></br>{property.price} USD</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
