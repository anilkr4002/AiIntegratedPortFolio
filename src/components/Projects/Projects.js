import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import editor from "../../Assets/Projects/building.png";
import chatify from "../../Assets/Projects/R.png";
import bitsOfCode from "../../Assets/Projects/Fake.jpeg";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Food Delivery"
              description="Food delivery website based on mern stack "
              ghLink="https://github.com/anilkrmandal/FoodDelivery"
           
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Fake News Detector"
              description="A Machinne learning model based on fasttext, cnn lstm and Lime to detect fake news and give evaluation metrics"
              ghLink="https://github.com/anilkrmandal/FakeNewsDetecctor"
              
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Real-Estate"
              description="A real world Project on Real-Estate integrated with API"
              ghLink="https://github.com/anilkrmandal/real_estate"
                          
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
