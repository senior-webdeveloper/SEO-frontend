import React, { useState, memo, useEffect } from "react";
import { Col, Form } from "react-bootstrap";
import { Input, Row } from "reactstrap";
import axios from "axios";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const SearchOptions = () => {
  //Use for all the dispatch actions
  const dispatch = useDispatch();
  const router = useRouter();

  const countries = useSelector((state) => state.currentAuth.countries);
  const pageNumber = useSelector((state) => state.currentAuth.page);
  const h1Title = useSelector((state) => state.currentAuth.title);
  const apiRoute = useSelector((state) => state.currentAuth.apiRoute);

  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [locality, setLocality] = useState("");
  const [sectorOne, setSectorOne] = useState("");
  const [sectorTwo, setSectorTwo] = useState("");
  const [sectorSearch, setSectorSearch] = useState("");
  const [countrySearch, setCountrySearch] = useState("");

  // get data when the pagination is changed
  useEffect(() => {
    if (apiRoute == 'getData') {
      getDatawithCurrentOption()
    }
    if (apiRoute == 'getDataWithText') {
      getDataWithText();
    }
  }, [pageNumber]);

  // Search with Drop Down Menu
  const getDatawithCurrentOption = async () => {
    let formData = $("#filterForm").serializeArray();

    dispatch({ type: "UPDATE_LOADING", payload: true });
    setSectorSearch("");
    setCountrySearch("");

    router.push(
      `/search/getData?page=${pageNumber}&country=${formData[0].value}&city=${formData[1].value}&town=${formData[2].value}&locality=${formData[3].value}&sectorOne=${formData[4].value}&sectorTwo=${formData[5].value}`
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getDataWithText();
    }
  };

  // Search with Text
  const getDataWithText = () => {
    if (sectorSearch == "" && countrySearch == "") return;

    setCity("");
    setTown("");
    setLocality("");
    setSectorOne("");
    setSectorTwo("");

    dispatch({ type: "UPDATE_LOADING", payload: true });

    router.push(
      `/search/getDataWithText?page=${pageNumber}&sector=${sectorSearch}&country=${countrySearch}`
    );
  };

  // get childrens when changing parent option
  function handleChange(type, value) {
    let formData = $("#filterForm").serializeArray();

    switch (type) {
      case "country":
        setCity("");
        setTown("");
        setLocality("");
        setSectorOne("");
        setSectorTwo("");
        break;

      case "city":
        setTown("");
        setLocality("");
        setSectorOne("");
        setSectorTwo("");
        break;

      case "town":
        setLocality("");
        setSectorOne("");
        setSectorTwo("");
        break;

      case "locality":
        setSectorOne("");
        setSectorTwo("");
        break;

      case "sectorOne":
        setSectorTwo("");
        break;

      default:
        break;
    }

    if (value != "") {
      axios.defaults.withCredentials = true;
      axios
        .get(
          `https://yes-here.online/api/getSearchOptions?type=${type}&country=${formData[0].value}&city=${formData[1].value}&town=${formData[2].value}&locality=${formData[3].value}&sectorOne=${formData[4].value}`
        )
        .then((res) => {
          switch (type) {
            case "country":
              setCity(res.data.main);
              setSectorOne(res.data.sectorOne);
              break;

            case "city":
              setTown(res.data.main);
              setSectorOne(res.data.sectorOne);
              break;

            case "town":
              setLocality(res.data.main);
              setSectorOne(res.data.sectorOne);
              break;

            case "locality":
              setSectorOne(res.data.sectorOne);
              break;

            case "sectorOne":
              setSectorTwo(res.data.main);
              break;

            default:
              break;
          }
          // get date with current options
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="job-list-header">
        <Form action="#" id="textFilter">
          <Row className="g-2">
            <Col lg={4} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-job-input-box-option"
                  id="exampleFormControlInput1"
                  placeholder="tailor, doctor..."
                  value={sectorSearch}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setSectorSearch(e.target.value);
                  }}
                />
              </div>
            </Col>{" "}
            <Col lg={6} md={6}>
              <div className="filler-job-form">
                <i className="uil uil-briefcase-alt"></i>
                <Input
                  type="search"
                  className="form-control filter-job-input-box-option"
                  id="exampleFormControlInput1"
                  placeholder="City, Locality..."
                  value={countrySearch}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);
                  }}
                />
              </div>
            </Col>{" "}
            <Col lg={2} md={6}>
              <li
                onClick={() => getDataWithText()}
                className="btn btn-info w-100"
              >
                <i className="uil uil-search"></i> Search
              </li>
            </Col>
          </Row>
        </Form>
        <Form action="#" id="filterForm">
          <Row className="g-2">
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="country"
                  id="country"
                  aria-label="Default select example"
                  onChange={(e) => handleChange("country", e.target.value)}
                >
                  <option value="">...</option>
                  {countries
                    ? countries.map((country, key) => (
                      <option key={key} value={country["location_country"]}>
                        {country["location_country"]}
                      </option>
                    ))
                    : null}
                </select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="city"
                  id="city"
                  aria-label="Default select example"
                  onChange={(e) => handleChange("city", e.target.value)}
                >
                  <option value="">...</option>

                  {city
                    ? city.map((city, key) => (
                      <option key={key} value={city.region}>
                        {city.region}
                      </option>
                    ))
                    : null}
                </select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <label htmlFor="town" className="form-label">
                  Town
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="town"
                  id="town"
                  aria-label="Default select example"
                  onChange={(e) => handleChange("town", e.target.value)}
                >
                  <option value="">...</option>
                  {town
                    ? town.map((town, key) => (
                      <option key={key} value={town.metro}>
                        {town.metro}
                      </option>
                    ))
                    : null}
                </select>
              </div>
            </Col>
            <Col lg={3} md={6}>
              <div className="filler-job-form">
                <label htmlFor="locality" className="form-label">
                  Locality
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="locality"
                  id="locality"
                  aria-label="Default select example"
                  onChange={(e) => handleChange("locality", e.target.value)}
                >
                  <option value="">...</option>
                  {locality
                    ? locality.map((elem, key) => (
                      <option key={key} value={elem.locality}>
                        {elem.locality}
                      </option>
                    ))
                    : ""}
                </select>
              </div>
            </Col>{" "}
          </Row>

          <Row className="g-2">
            <Col lg={5} md={6}>
              <div className="filler-job-form">
                <label htmlFor="sectorOne" className="form-label">
                  Main Sector
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="sectorOne"
                  id="sectorOne"
                  aria-label="Default select example"
                  onChange={(e) => handleChange("sectorOne", e.target.value)}
                >
                  <option value="">...</option>
                  {sectorOne
                    ? sectorOne.map((elem, key) => (
                      <option key={key} value={elem.industry}>
                        {elem.industry}
                      </option>
                    ))
                    : ""}
                </select>
              </div>
            </Col>{" "}
            <Col lg={5} md={6}>
              <div className="filler-job-form">
                <label htmlFor="sectorTwo" className="form-label">
                  Sub Sector
                </label>
                <select
                  className="form-select form-select-option"
                  data-trigger
                  name="sectorTwo"
                  id="sectorTwo"
                  aria-label="Default select example"
                >
                  <option value="">...</option>
                  {sectorTwo
                    ? sectorTwo.map((elem, key) => (
                      <option key={key} value={elem.industry_two}>
                        {elem.industry_two}
                      </option>
                    ))
                    : ""}
                </select>
              </div>
            </Col>
            <Col lg={2} md={6}>
              <label className="form-label">{"."} </label>
              <li
                onClick={() => getDatawithCurrentOption()}
                className="btn btn-primary w-100 filterBtn"
              >
                <i className="uil uil-filter"></i> Fliter
              </li>
            </Col>
          </Row>
        </Form>
        <div className="searchTitle">
          <h1>{h1Title}
          </h1>
        </div>
      </div>
    </>
  );
};

export default memo(SearchOptions);
