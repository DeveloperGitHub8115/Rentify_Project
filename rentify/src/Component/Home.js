
import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import axios from 'axios';

export function Property() {
  const [formData, setFormData] = useState({
    ownership: '',
    propertyName: '',
    propertyType: [],
    location: {
      type: '',
      coordinates: [],
      city: '',
      zipcode: '',
      state: '',
      country: '',
    },
    description: '',
    owner: '',
    ownerContactDetails: {
      phones: [''],
      emails: [''],
    },
    monthlyRent: '',
    securityAmount: '',
    perNightCharge: '',
    locationAdvantage: [''],
    images: [],
    allowed: true,
  });

  const propertyTypeOptions = [
    'Apartment',
    'FarmHouse',
    'Hostel',
    'Independent House',
    '1RK/Studio Apartment',
    'Bungalow/Villa',
    'PG',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith('ownerContactDetails.phones') || name.startsWith('ownerContactDetails.emails')) {
      const fieldArray = name.split('.');
      const fieldIndex = parseInt(fieldArray[1]);
      const fieldKey = fieldArray[0];

      if (fieldKey === 'phones') {
        const newPhones = [...formData.ownerContactDetails.phones];
        newPhones[fieldIndex] = value;
        setFormData({
          ...formData,
          ownerContactDetails: {
            ...formData.ownerContactDetails,
            phones: newPhones,
          },
        });
      } else if (fieldKey === 'emails') {
        const newEmails = [...formData.ownerContactDetails.emails];
        newEmails[fieldIndex] = value;
        setFormData({
          ...formData,
          ownerContactDetails: {
            ...formData.ownerContactDetails,
            emails: newEmails,
          },
        });
      }
    } else if (name.startsWith('location')) {
      const locationField = name.split('.')[1];
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          [locationField]: value,
        },
      });
    } else if (name === 'propertyType') {
      const propertyTypes = [...formData.propertyType];
      if (checked) {
        propertyTypes.push(value);
      } else {
        const index = propertyTypes.indexOf(value);
        if (index > -1) {
          propertyTypes.splice(index, 1);
        }
      }
      setFormData({
        ...formData,
        propertyType: propertyTypes,
      });
    } else if (type === 'file') {
      const newImages = [...formData.images];
      newImages.push(e.target.files[0]);
      setFormData({
        ...formData,
        images: newImages,
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item) => {
          formDataToSubmit.append(key, item);
        });
      } else {
        formDataToSubmit.append(key, formData[key]);
      }
    });

    axios.post('http://localhost:8000/properties/postproperty', formDataToSubmit)
      .then((response) => {
        console.log('Form submitted successfully. Server response:', response.data);
      })
      .catch((error) => {
        console.error('Error submitting the form:', error);
      });
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Property Form</h1>
      <div className="d-flex justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="ownership">
            <Form.Label>Ownership:</Form.Label>
            <Form.Control
              type="text"
              name="ownership"
              value={formData.ownership}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="propertyName">
            <Form.Label>Property Name:</Form.Label>
            <Form.Control
              type="text"
              name="propertyName"
              value={formData.propertyName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="propertyType">
            <Form.Label>Property Type:</Form.Label>
            {propertyTypeOptions.map((type) => (
              <Form.Check
                key={type}
                type="checkbox"
                label={type}
                name="propertyType"
                value={type}
                checked={formData.propertyType.includes(type)}
                onChange={handleChange}
              />
            ))}
          </Form.Group>

          <Form.Group controlId="location.type">
            <Form.Label>Location Type:</Form.Label>
            <Form.Control
              type="text"
              name="location.type"
              value={formData.location.type}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="location.coordinates">
            <Form.Label>Coordinates:</Form.Label>
            <Form.Control
              type="text"
              name="location.coordinates"
              value={formData.location.coordinates}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="location.city">
            <Form.Label>City:</Form.Label>
            <Form.Control
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="location.zipcode">
            <Form.Label>Zipcode:</Form.Label>
            <Form.Control
              type="text"
              name="location.zipcode"
              value={formData.location.zipcode}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="location.state">
            <Form.Label>State:</Form.Label>
            <Form.Control
              type="text"
              name="location.state"
              value={formData.location.state}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="location.country">
            <Form.Label>Country:</Form.Label>
            <Form.Control
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="owner">
            <Form.Label>Owner:</Form.Label>
            <Form.Control
              type="text"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="ownerContactDetails.phones">
            <Form.Label>Owner Contact Phones:</Form.Label>
            {formData.ownerContactDetails.phones.map((phone, index) => (
              <Form.Control
                key={index}
                type="text"
                name={`ownerContactDetails.phones.${index}`}
               
                onChange={handleChange}
              />
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                setFormData({
                  ...formData,
                  ownerContactDetails: {
                    ...formData.ownerContactDetails,
                    phones: [...formData.ownerContactDetails.phones, ''],
                  },
                })
              }
            >
              Add Phone
            </Button>
          </Form.Group>

          <Form.Group controlId="ownerContactDetails.emails">
            <Form.Label>Owner Contact Emails:</Form.Label>
            {formData.ownerContactDetails.emails.map((email, index) => (
              <Form.Control
                key={index}
                type="text"
                name={`ownerContactDetails.emails.${index}`}
              
                onChange={handleChange}
              />
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                setFormData({
                  ...formData,
                  ownerContactDetails: {
                    ...formData.ownerContactDetails,
                    emails: [...formData.ownerContactDetails.emails, ''],
                  },
                })
              }
            >
              Add Email
            </Button>
          </Form.Group>

          <Form.Group controlId="monthlyRent">
            <Form.Label>Monthly Rent:</Form.Label>
            <Form.Control
              type="number"
              name="monthlyRent"
              value={formData.monthlyRent}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="securityAmount">
            <Form.Label>Security Amount:</Form.Label>
            <Form.Control
              type="number"
              name="securityAmount"
              value={formData.securityAmount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="perNightCharge">
            <Form.Label>Per Night Charge:</Form.Label>
            <Form.Control
              type="number"
              name="perNightCharge"
              value={formData.perNightCharge}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="locationAdvantage">
            <Form.Label>Location Advantages:</Form.Label>
            {formData.locationAdvantage.map((advantage, index) => (
              <Form.Control
                key={index}
                type="text"
                name={`locationAdvantage[${index}]`}
               
                onChange={handleChange}
              />
            ))}
            <Button
              variant="secondary"
              onClick={() =>
                setFormData({
                  ...formData,
                  locationAdvantage: [...formData.locationAdvantage, ''],
                })
              }
            >
              Add Location Advantage
            </Button>
          </Form.Group>

          <Form.Group controlId="images">
            <Form.Label>Images:</Form.Label>
            <Form.Control
              type="file"
              name="images"
              onChange={handleChange}
              multiple
            />
          </Form.Group>

          <Form.Group controlId="allowed">
            <Form.Check
              type="checkbox"
              name="allowed"
              label="Allowed"
              checked={formData.allowed}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
}


// import { Container, Paper, Select } from "@mui/material";
// import { useEffect } from "react";
// import { useState } from "react";
// import { Carousel, Col, Row } from "react-bootstrap";
// const house = new URL('./imgs/house3.jpeg', import.meta.url);
// const house1 = new URL('./imgs/house2.jpeg', import.meta.url);
// const house2 = new URL('./imgs/house5.jpeg', import.meta.url);
// const house5 = new URL('./imgs/house5.jpeg', import.meta.url);
// export function Home() {
//     const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]); // Initialize as an empty array
//   const [selectedCountry, setSelectedCountry] = useState("");
//   const [selectedState, setSelectedState] = useState("");
//   const [selectedCity, setSelectedCity] = useState(""); // Declare selectedCity and setSelectedCity

//   useEffect(() => {
//     loadCountries();
//   }, []);

//   const config = {
//     cUrl: "https://api.countrystatecity.in/v1/countries",
//     ckey: "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
//   };

//   function loadCountries() {
//     let apiEndPoint = config.cUrl;

//     fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.ckey } })
//       .then((response) => response.json())
//       .then((data) => {
//         setCountries(data);
//       })
//       .catch((error) => console.error("Error loading countries:", error));
//   }

//   function loadStates(countryCode) {
//     setSelectedState("");
//     setCities([]); // Reset cities

//     fetch(`${config.cUrl}/${countryCode}/states`, {
//       headers: { "X-CSCAPI-KEY": config.ckey },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setStates(data);
//       })
//       .catch((error) => console.error("Error loading states:", error));
//   }

//   function loadCities(countryCode, stateCode) {
//     fetch(`${config.cUrl}/${countryCode}/states/${stateCode}/cities`, {
//       headers: { "X-CSCAPI-KEY": config.ckey },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setCities(data);
//       })
//       .catch((error) => console.error("Error loading cities:", error));
//   }

//     return (
//         <>
//             <div style={{ width: "100%" }}>
//                 <Carousel nextIcon={null} prevIcon={null}>
//                     <Carousel.Item>
//                         <img src={house5}
//                             className="d-block w-100"
//                             width="100%"
//                             height="350"
//                             alt="#"
//                         />

//                     </Carousel.Item>
//                     <Carousel.Item>
//                         <img src={house}
//                             className="d-block w-100"
//                             height="350"
//                             alt="#"
//                         />


//                     </Carousel.Item>
//                     <Carousel.Item>
//                         <img src={house2}
//                             className="d-block w-100"
//                             height="350"
//                             alt="#"
//                         />

//                     </Carousel.Item>
//                     <Carousel.Item>
//                         <img src={house1}
//                             className="d-block w-100"
//                             height="350"
//                             alt="#"
//                         />

//                     </Carousel.Item>
//                     <Carousel.Item>
//                         <img src={house}
//                             className="d-block w-100"
//                             height="350"
//                             alt="#"
//                         />

//                     </Carousel.Item>
//                 </Carousel>
//             </div>
//             <Container>
//                 <Paper elevation={6} style={{position:"relative", bottom:"30px"}}>
//                     <Row>
//                         <Col lg={4}>
//                             <Select
//                                   style={{backgroundColor:"lightcoral"}}
//                                 fullWidth
//                                 placeholder="select country"
//                                 value={selectedCountry}
//                                 onChange={(e) => {
//                                     const countryCode = e.target.value;
//                                     setSelectedCountry(countryCode);
//                                     setSelectedState(""); // Reset selected state
//                                     setCities([]); // Reset cities
//                                     loadStates(countryCode); // Load states for the selected country
//                                 }}
//                             >
                            
//                                 {countries.map((country) => (
//                                     <option key={country.iso2} value={country.iso2}>
//                                         {country.name}
//                                     </option>
//                                 ))}
//                             </Select>
//                         </Col>
//                         <Col lg={4}>
//                             <Select
//                                fullWidth
//                                 value={selectedState}
//                                 onChange={(e) => {
//                                     const stateCode = e.target.value;
//                                     setSelectedState(stateCode);
//                                     loadCities(selectedCountry, stateCode); // Load cities for the selected country and state
//                                 }}
//                                 disabled={!selectedCountry}
//                             >
                          
//                                 {states.map((state) => (
//                                     <option key={state.iso2} value={state.iso2}>
//                                         {state.name}
//                                     </option>
//                                 ))}
//                             </Select>
//                         </Col>
//                         <Col lg={4}>
//                             <Select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} disabled={!selectedState} fullWidth>
//                                   <option>Select City</option>
//                                 {cities.map((city) => (
//                                     <option key={city.iso2} value={city.iso2}>
//                                         {city.name}
//                                     </option>
//                                 ))}
//                             </Select>
//                         </Col>
//                     </Row>

//                 </Paper>
//             </Container>


//         </>
//     )
// }