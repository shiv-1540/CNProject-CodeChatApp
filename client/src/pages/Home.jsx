// // Home.jsx
// import React from 'react';
// import { Box } from '@chakra-ui/react' 
// import CodeEditor from '../components/CodeEditor';

// const Home = () => {
//   console.log('Home component loaded');
//   return (
//     <Box minH="90vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
//     <CodeEditor/>
//     </Box>
   
//   );
// };


// export default Home;


import React from "react";
import "./Home.css";
import profilePic from "../assets/MyProfile.jpg";
import { Button } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { IoSearch } from "react-icons/io5";
import { Select } from "@chakra-ui/react";
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();
  return (
    <main className="home-main-container">
      <aside className="profile-container">
        <div className="profilePicBox">
          <img src={profilePic} alt="amrik-bhadra-profile-pic" />
        </div>
        <div className="profile-content">
          <h1>@amrikb</h1>
          <p>amrik.bhadra@gmail.com</p>
        </div>

        <Button
          rightIcon={<MdLogout />}
          colorScheme="teal"
          variant="solid"
          padding="1.8rem 2.2rem"
          fontSize="1.2rem"
        >
          Logout
        </Button>
      </aside>
      <section className="main-content">
        <div className="header-div">
          <h1>
            Welcome Back, <span>Amrik Bhadra</span>
          </h1>
          <div className="header-btn-div">
            <Button
              leftIcon={<IoIosCreate className="icon" />}
              colorScheme="green"
              size="md"
              width="7rem"
              onClick={()=>{navigate('/createProject')}}
            >
              Create
            </Button>
            <Button
              leftIcon={<IoMdAddCircle className="icon" />}
              colorScheme="red"
              size="md"
              width="7rem"
            >
              Join
            </Button>
          </div>
        </div>

        <div className="projects-card-main-container">
          <div className="filter-box">
            <InputGroup size="md" mb={4} className="searchbarbox" width="20rem" >
              <InputLeftElement pointerEvents="none">
                <IoSearch className="searchIcon" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search Project"
                aria-label="Search projects"
                className="search-bar"
                background="white"
              />
            </InputGroup>


            <Select placeholder="Select Domain" background="white" maxWidth="12rem">
                <option value="web development">Web Development</option>
                <option value="java development">Java Development</option>
                <option value="data science">Data Science</option>
                <option value="ai & ml">AI & ML</option>
            </Select>

            {/* <div className="drop-box-container">
              <Select placeholder="Select " background="white">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </Select>

              
            </div> */}
          </div>

          <div className="projects-card-box">
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
