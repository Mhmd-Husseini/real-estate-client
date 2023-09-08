import React from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from '@material-tailwind/react';

const PropertyCard = ({ property }) => {
  return (
    <Card className="w-full max-w-[22rem] cursor-pointer shadow-lg  hover:text-secondary rounded-lg p-4 mt-10 mb-10 transition-colors duration-100 ease-in-out border-primary border-2">
      <CardHeader className='mt--6' floated={false} color="blue-gray">
        <img className='rounded-lg'src={`data:image/jpeg;base64,${property.img1}`}alt={property.title} />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="flex font-medium transition-colors duration-300 ease-in-out mt-3">
            <p>{property.title}</p> <p className='text-gray-500 text-sm'> {property.area} sqft</p>
          </Typography>
        </div>
        <Typography className=" text-secondary font-semibold">
          {property.price}$
          <p className='text-primary font-bold'>{property.city.city}</p>          
        </Typography>
      </CardBody>
      <CardFooter >
        <Button size="lg" fullWidth={true} className=' text-stone-700 p-3 hover:bg-primary transition-colors duration-100'>
          Show Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
