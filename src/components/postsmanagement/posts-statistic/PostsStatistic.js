import { CCardBody } from "@coreui/react";
import React, { useEffect, useState } from "react";

import { Pie, Line } from "react-chartjs-2";
import { analyzePost } from "src/redux/actions/analyzePost";

const PostsStatistic = () => {
  const [postData, setPostData] = useState({});
  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    analyzePost("2021", (result) => {
      setPostData({
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        datasets: [
          {
            label: "# of Posts",
            data: result.data,
            fill: false,
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgba(255, 99, 132, 0.2)",
          },
        ],
      });
    });
  }, []);

  // const skillData = {
  //   labels: [
  //     "Java",
  //     "Javascript",
  //     "Python",
  //     "ReactJs",
  //     "Angular",
  //     "Nodejs",
  //     "PHP",
  //   ],
  //   datasets: [
  //     {
  //       label: "# of Posts",
  //       data: [12, 19, 3, 5, 2, 3, 7],
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(54, 162, 235, 0.2)",
  //         "rgba(255, 206, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //         "rgba(153, 102, 255, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //         "rgba(105, 159, 64, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //         "rgba(75, 192, 192, 1)",
  //         "rgba(153, 102, 255, 1)",
  //         "rgba(255, 159, 64, 1)",
  //         "rgba(105, 159, 64, 0.2)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const data = ;

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <CCardBody className="statistic">
        <h1>Posts Chart</h1>
        <Line data={postData} options={options} />
        <h1>Posts - Skills Chart </h1>
        <div className="pie-posts">
          <Pie
            data={skillData}
            width={100}
            height={100}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
      </CCardBody>
    </>
  );
};

export default PostsStatistic;
