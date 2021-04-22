import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPostsComp } from "src/redux/actions/getPostsComp";
// import { toast } from "react-toastify";
// import LoadingOverlay from "react-loading-overlay";
import {
  CRow,
  CCol,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CInput,
  CTextarea,
  CLabel,
} from "@coreui/react";
import { toast } from "react-toastify";
import { getAuth } from "src/utils/helpers";
import Post from "src/components/common/Post";
import { addPost } from "../../redux/actions/addPost";
// import ReactLoading from "react-loading";
const PostComp = () => {
  const [posts, setPosts] = useState([]);
  const storeGetPosts = useSelector((store) => store.getPostsComp);
  const loadingList = storeGetPosts.loading;
  const [isOpen, setOpen] = useState(false);
  const loading = useSelector((store) => store.addPost.loading);
  const [form, setForm] = React.useState({
    position: [],
    skills: [],
    salary: "",
    endTime: "",
    address: "",
    description: "",
  });

  useEffect(() => {
    getPostsComp((item) => {
      setPosts(item.posts);
      console.log(item.posts);
    });
  }, []);

  const handleChange = (event) => {
    var date = new Date("2021-04-16");
    if (!isNaN(date.getTime())) {
      // Months use 0 index.
      console.log(
        date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
      );
    }
    console.log(event.target.value.trim());
    setForm({ ...form, [event.target.name]: event.target.value.trim() });
    console.log(form);
  };

  const handleSubmit = (event) => {
    console.log("create post");
    event.preventDefault();
    // const errorState = validate();
    // if (Object.keys(errorState).length > 0) {
    //   return setError(errorState);
    // }
    console.log(event);
    const post = {
      // address: form.address,
      // description: form.description,
      // endTime: form.endTime,
      // position: form.position,
      // salary: form.salary,
      // skill: form.skills,
      address: "DN",
      description: "10 năm kn",
      endTime: "01-01-2021",
      position: ["QC", "QA"],
      salary: "1000$",
      skill: ["test"],
    };

    addPost(post, (data) => {
      if (data.status === 200) {
        setOpen(!isOpen);
        toast.success("Create Post Successfully !", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        // window.location.reload();
      } else {
        alert(data.msg);
      }
    });
    setOpen(!isOpen);
  };
  return (
    <>
      <CRow>
        <CButton
          style={{ float: "right" }}
          color="primary"
          className="mr-1 right-btn"
          onClick={() => setOpen(!isOpen)}
        >
          Create new post
        </CButton>
        <CModal show={isOpen} onClose={() => setOpen(!isOpen)} color="primary">
          <CModalHeader closeButton>
            <CModalTitle>New post</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm action="" method="post" className="form-horizontal">
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Position</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="position"
                    name="position"
                    placeholder=""
                    onChange={handleChange}
                  />
                  {/* <CFormText></CFormText> */}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="text-input">Skills</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="skill"
                    name="skill"
                    placeholder=""
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Salary</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="salary"
                    name="salary"
                    placeholder=""
                    onChange={handleChange}
                  />
                  {/* <CFormText></CFormText> */}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Address</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="address"
                    name="address"
                    placeholder=""
                    onChange={handleChange}
                  />
                  {/* <CFormText></CFormText> */}
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="date-input">End time</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="date"
                    id="endTime"
                    name="endTime"
                    placeholder="date"
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>

              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="textarea-input" onChange={handleChange}>
                    Description
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CTextarea
                    name="description"
                    id="description"
                    rows="5"
                    placeholder=""
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" disabled={loading} onClick={handleSubmit}>
              Create
            </CButton>{" "}
            <CButton
              color="secondary"
              onClick={() => {
                setOpen(!isOpen);
                window.location.reload();
              }}
            >
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>
        {/*  */}
      </CRow>
      {/* <LoadingOverlay active={loadingList} spinner text="Loading..."> */}
      <CRow>
        {/* {loadingList && <ReactLoading type="spinningBubbles" color="#321fdb" />} */}
        <CCol>
          {posts &&
            posts.map((item, index) => {
              return (
                <Post
                  key={index}
                  compName={item.companyName}
                  position={item.position}
                  address={item.address}
                  skill={item.skill}
                  endTime={item.endTime}
                  salary={item.salary}
                  image="https://via.placeholder.com/50"
                  auth={getAuth}
                  postId={item._id}
                  compId={item.companyId}
                />
              );
            })}
        </CCol>
      </CRow>
      {/* </LoadingOverlay> */}
    </>
  );
};

export default PostComp;
