import React, { useState, useEffect } from "react";
import { Card, CardHeader, Typography, CardBody, IconButton, Tooltip, Input } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { sendRequest } from './../../config/request'; 
import Modal from "../../components/Modal";
import { useNavigate } from 'react-router-dom';

const TABLE_HEAD = ["ID", "Name", "Email", "Phone", "User Type", "Delete"];

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false); 

  const fetchUsers = async () => {
    try {
      const response = await sendRequest({ method: "GET", route: "user" });

      if (response) {
        const mappedUsers = response.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          type_id: user.type_id,
          userType: user.role_id === 1 ? "Admin" : user.role_id === 2 ? "User" : "Author",
        }));

        setUsers(mappedUsers);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      navigate("/");
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await sendRequest({ method: "DELETE", route: `user/delete/${id}` });

      if (response) {
        setShowModal(true);
        fetchUsers();
      } else {
        console.error("Error deleting user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Card className="h-full w-full mx-1">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className='mb-10'>
            <h2 className="text-3xl text-gray-800 font-medium leading-9">Analytics and Statistics </h2>
            <div className="w-36 h-1.5 bg-gradient-to-r from-primary to-black mt-3"></div>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input label="Search" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="mx-4 px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(({ id, name, email, phone, userType }, index) => {
              const isLast = index === users.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {id}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-bold">
                      {name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {phone}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {userType}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-2">
                      <Tooltip content="Delete User">
                        <IconButton variant="text" onClick={() => deleteUser(id)}>
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      {showModal && (<Modal message="User Deleted Successfuly" onClose={closeModal} />)} 
    </Card>
  );
}

export default Users;
