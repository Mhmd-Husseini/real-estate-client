import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Map from "../../components/Map";
import Modal from "../../components/Modal";
import ButtonSm from "../../components/ButtonSm";
import { sendRequest } from "../../config/request";
import Broker from '../../hero-img.png'
import 'leaflet/dist/leaflet.css';

const AddProperty = () => {
  const regions = [{key:1 , name: 'Beirut'},{key:2, name: 'Jounieh'},{key:3, name: 'Chouf'},{key:4, name: 'Batroun'},{key:5, name: 'Keserwen'},{key:6, name: 'Byblos'},{key:7, name: 'Nabatieh'},{key:8, name: 'Saida'},{ key:9, name: 'Tyre'}];
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState("");
  const [propertyDetails, setPropertyDetails] = useState({city_id: "",title: "",description: "",price: "",area: "",address: "",latitude: 33.88,longitude: 35.5});
  const [homeProperties, setHomeProperties] = useState({rooms: "",balconies: "",bathrooms: "",garages: "",});
  const handleLatLng = (lat, lng) =>{setPropertyDetails({...propertyDetails, latitude: lat, longitude: lng})}
  const [imageData, setImageData] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]); 
  const [validationErrors, setValidationErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const validateForm = () => {
    const errors = {};
    if (!propertyType) errors.propertyType = "Please select a property type";
    if (!propertyDetails.city_id) errors.cityId = "City is required";
    if (!propertyDetails.title) errors.title = "Title is required";
    if (!propertyDetails.description) errors.description = "Description is required";
    if (!propertyDetails.price) errors.price = "Price is required";
    if (!propertyDetails.area) errors.area = "Area is required";
    if (!propertyDetails.address) errors.address = "Address is required";
    if (!propertyDetails.latitude) errors.latitude = "Latitude is required";
    if (!propertyDetails.longitude) errors.longitude = "Longitude is required";
    if (propertyType === "home") {
      if (!homeProperties.rooms) errors.rooms = "Number of rooms is required";
      if (!homeProperties.balconies) errors.balconies = "Number of balconies is required";
      if (!homeProperties.bathrooms) errors.bathrooms = "Number of bathrooms is required";
      if (!homeProperties.garages) errors.garages = "Number of garages is required";
    }
    if (imageData.length !== 3) errors.images = "Please upload 3 images";
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    const isFormValid = validateForm();
    if (!isFormValid) return;
    const request = {
      city_id: propertyDetails.city_id,
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
      area: propertyDetails.area,
      address: propertyDetails.address,
      type: propertyType,
      latitude: propertyDetails.latitude,
      longitude: propertyDetails.longitude,
      rooms_nb: propertyType === "home" ? homeProperties.rooms : null,
      balconies_nb: propertyType === "home" ? homeProperties.balconies : null,
      bathrooms_nb: propertyType === "home" ? homeProperties.bathrooms : null,
      garages_nb: propertyType === "home" ? homeProperties.garages : null,
      images: imageData,
    };
    try {
      const response = await sendRequest({
        method: "POST",
        route: "/user/addOrUpdate",
        body: request,
      });
      if (response.status === 401) {
        navigate("/auth");
      } else {
        console.log(response);
        openModal()
        setPropertyType("");
        setPropertyDetails({city_id: "",title: "",description: "",price: "",area: "",address: "",latitude: "",longitude: ""});
        setHomeProperties({rooms: "",balconies: "",bathrooms: "",garages: ""});
        setImageData([]);
        setImagePreviews([]); 
      }
    } catch (error) {
      console.error(error);
      navigate("/auth");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const base64Images = [];
    const previews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        base64Images.push(e.target.result);
        previews.push(<img key={file.name} src={e.target.result}alt={file.name}style={{ maxWidth: "100px", maxHeight: "100px", margin: "4px" }}/>);
        if (base64Images.length === files.length) {
          setImageData(base64Images);
          setImagePreviews(previews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <div className="max-w-lg md:ml-20 space-y-4 mb-10">
        <div>
          <h2 className="text-3xl text-gray-800 font-medium leading-9">Add Your Property</h2>
          <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mb-5 mt-3"></div>
        </div>
      </div>
      <div className="flex flex-row-reverse gap-20">
        <div className="hidden lg:block"> <img src={Broker}></img> </div> 
        <div className="max-w-lg md:ml-20 space-y-4">
          <div className="flex flex-wrap space-y-4">
            <div className="w-full ">
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}className="p-3 border rounded-md border-gray-300 w-full">
                <option value="">Select Property Type </option>
                <option value="home">Home</option>
                <option value="land">Land</option>
              </select>
              {validationErrors.propertyType && (<p className="text-red-400 text-sm">{validationErrors.propertyType} </p>)}
            </div>
            <div className="w-full">
            <label className="block mb-2 text-gray-600">City</label>
              <select value={propertyDetails.city_id}onChange={(e) => setPropertyDetails({ ...propertyDetails, city_id: e.target.value })} className="p-3 border rounded-md border-gray-300 w-full">
                <option value="">Select City</option>
                {regions.map((region) => (<option key={region.key} value={region.key}>{region.name}</option>))}
              </select>
              {validationErrors.city_id && (<p className="text-red-400 text-sm">{validationErrors.city_id}</p>)}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Title</label>
              <Input label="" type="text" onChange={(value) => setPropertyDetails({ ...propertyDetails, title: value })} value={propertyDetails.title}/>
              {validationErrors.title && (<p className="text-red-400 text-sm">{validationErrors.title}</p>)}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Description</label>
              <Input label=""type="text"onChange={(value) => setPropertyDetails({ ...propertyDetails, description: value })}value={propertyDetails.description}/>
              {validationErrors.description && (<p className="text-red-400 text-sm">{validationErrors.description}</p>)}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Price</label>
              <Input label="" type="number"onChange={(value) => setPropertyDetails({ ...propertyDetails, price: value })}value={propertyDetails.price} />
              {validationErrors.price && (<p className="text-red-400 text-sm">{validationErrors.price}</p>)}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Area</label>
              <Input label="" type="number"onChange={(value) => setPropertyDetails({ ...propertyDetails, area: value })}value={propertyDetails.area}/>
              {validationErrors.area && (<p className="text-red-400 text-sm">{validationErrors.area}</p>)}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Address</label>
              <Input label="" type="text" onChange={(value) => setPropertyDetails({ ...propertyDetails, address: value })}value={propertyDetails.address}/>
              {validationErrors.address && (<p className="text-red-400 text-sm">{validationErrors.address}</p>)}
            </div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Set the Location by Dragging the Mark</label>
              <Map handleLatLng={handleLatLng} position={[propertyDetails.latitude, propertyDetails.longitude]} draggable={true} />
            </div>
          </div>

          {propertyType === "home" && (
            <div >
              <div className="w-full">
                <label className="block mb-2 text-gray-600">Number of Rooms</label>
                <Input label="" type="number"onChange={(value) => setHomeProperties({ ...homeProperties, rooms: value })}value={homeProperties.rooms}/>
                {validationErrors.rooms && (<p className="text-red-400 text-sm">{validationErrors.rooms}</p>)}
              </div>
              <div className="w-full">
                <label className="block mb-2 text-gray-600">Number of Balconies</label>
                <Input label=""type="number"onChange={(value) => setHomeProperties({ ...homeProperties, balconies: value })}value={homeProperties.balconies}/>
                {validationErrors.balconies && (<p className="text-red-400 text-sm">{validationErrors.balconies}</p>)}
              </div>
              <div className="w-full">
                <label className="block mb-2 text-gray-600">Number of Bathrooms</label>
                <Input label=""type="number"onChange={(value) => setHomeProperties({ ...homeProperties, bathrooms: value })}value={homeProperties.bathrooms}/>
                {validationErrors.bathrooms && (<p className="text-red-400 text-sm">{validationErrors.bathrooms}</p>)}
              </div>
              <div className="w-full">
                <label className="block mb-2 text-gray-600">Number of Garages</label>
                <Input label=""type="number"onChange={(value) => setHomeProperties({ ...homeProperties, garages: value })}value={homeProperties.garages}/>
                {validationErrors.garages && (<p className="text-red-400 text-sm">{validationErrors.garages}</p>)}
              </div>
            </div>
          )}

          <div>
            <div className="w-full">
              <label className="block mb-2 text-gray-600">Upload Images</label>
              <input label="" type="file" multiple accept="image/*" onChange={handleImageChange} className="p-2 border rounded-md border-gray-300 w-full"/>
              {validationErrors.images && (<p className="text-red-400 text-sm">{validationErrors.images}</p>)}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            {imagePreviews.map((preview, index) => (<div key={index}>{preview}</div>))}
          </div>
          <div className="flex justify-center">
            <ButtonSm buttonText="Submit" onClick={handleSubmit} />
          </div>
        </div>
        {showModal && (<Modal message="Property Added Successfuly" onClose={closeModal} />)}
      </div>
    </div>
  );
}; 

export default AddProperty;
