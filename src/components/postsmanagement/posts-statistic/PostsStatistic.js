import {
  CCardBody,
  CCol,
  CFormGroup,
  CLabel,
  CRow,
  CSelect,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import { Pie, Line } from "react-chartjs-2";
import { analyzePost } from "src/redux/actions/analyzePost";
import { analyzeSkill } from "src/redux/actions/analyzeSkill";
import LoadingOverlay from "react-loading-overlay";

import nodata from "../../../assets/icons/emoji.svg";
import { useSelector } from "react-redux";
const PostsStatistic = () => {
  const storeStatistic = useSelector((store) => store.analyzePost);
  const loading = storeStatistic.loading;

  const [isData, setIsData] = useState(false);

  const [postData, setPostData] = useState({});
  const [skillData, setSkillData] = useState({});
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const years = [];
  for (let i = 0; i <= 10; i++) {
    years.push(currentYear - i);
  }
  useEffect(() => {
    analyzePost(year, (result) => {
      if (
        result.status === 200 &&
        !result.data.every((val, i, arr) => val === arr[0])
      ) {
        setIsData(true);
        console.log("data");
        setPostData({
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
          ],
          datasets: [
            {
              label: "Number of Posts",
              data: result.data,
              fill: false,
              backgroundColor: "rgb(255, 0, 0)",
              borderColor: "rgba(255, 0, 0, 1)",
            },
          ],
        });
        analyzeSkill("year", year, (result) => {
          if (result.status === 200) {
            let label = result.data.map((e) => Object.keys(e)[0]);

            let data = result.data.map((e) => e[Object.keys(e)[0]]);
            console.log(label);
            console.log(data);

            setSkillData({
              labels: label,
              datasets: [
                {
                  label: " of Posts",
                  data: data,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(105, 159, 64, 0.2)",

                    "rgba(255, 69, 0, 0.2)",
                    "rgba(151, 255, 255, 0.2)",
                    "rgba(238, 180, 34, 0.2)",
                    "rgba(205, 205, 180, 0.2)",
                    "rgba(240, 128, 128, 0.2)",
                    "rgba(60, 179, 113, 0.2)",
                    "rgba(0, 206, 209, 0.2)",
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(105, 159, 64, 1)",

                    "rgba(255, 69, 0, 1)",
                    "rgba(151, 255, 255, 1)",
                    "rgba(238, 180, 34, 1)",
                    "rgba(205, 205, 180, 1)",
                    "rgba(240, 128, 128, 1)",
                    "rgba(60, 179, 113, 1)",
                    "rgba(0, 206, 209, 1)",
                  ],
                  borderWidth: 1,
                },
              ],
            });
          }
        });
      } else {
        setIsData(false);
      }
    });
  }, [year, isData]);

  const options = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month",
          color: "blue",
          font: {
            size: 20,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 },
        },
      },
      y: {
        min: 0,
        display: true,
        title: {
          display: true,
          text: "Post",
          color: "blue",
          font: {
            size: 20,
            weight: "bold",
            lineHeight: 1.2,
          },
          padding: { top: 10, left: 0, right: 0, bottom: 0 },
        },
      },
    },
  };
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Loading..."
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: "9999",
      }}
    >
      <CCardBody className="statistic">
        <div style={{ height: "250px" }}>
          <h1 className="title">Posts Chart</h1>
          <CRow>
            <CCol xs="4">
              <CFormGroup className="year-select">
                <CLabel className="mr-2" htmlFor="ccyear">
                  Year:
                </CLabel>

                <CSelect
                  custom
                  name="ccyear"
                  id="ccyear"
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                >
                  {years.map((y) => (
                    <option>{y}</option>
                  ))}
                </CSelect>
              </CFormGroup>
            </CCol>
          </CRow>
        </div>
        {isData ? (
          <>
            <Line data={postData} options={options} />
            <h1 className="title">Posts - Skills Chart </h1>
            <div className="pie-posts">
              <Pie
                style={{ height: "454.4px", width: "2326.4px" }}
                data={skillData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </>
        ) : (
          <div style={{ height: "250px" }}>
            {" "}
            <img src={nodata} alt="" width="100px" />
            <h1 style={{ textAlign: "center", fontSize: "30px" }}>No data </h1>
          </div>
        )}
      </CCardBody>
    </LoadingOverlay>
  );
};

export default PostsStatistic;
