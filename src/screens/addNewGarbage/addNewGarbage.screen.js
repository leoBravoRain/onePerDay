import React from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// material ui
// import Paper from '@material-ui/core/Paper';
// import Container from '@material-ui/core/Container';
// import { Button } from "@material-ui/core";
// import Typography from '@material-ui/core/Typography';
// import CircularProgress from "@material-ui/core/CircularProgress";

// material ui
import {
    // TextField,
    Paper,
    Container,
    Button,
    Typography,
    CircularProgress
} from '@material-ui/core';

// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
// import LiveTv from '@material-ui/icons/LiveTv';

// //  component
// import WorkshopComponent from "./components/workshop.component";
// import OverviewWorkshop from "./components/overviewWorkshop.component";

// firebase
// import { auth } from "../../config/firebase";
import { 
    st,
    fs,
    auth,
} from "../../libraries/firebase/firebase";

import firebase from "firebase";

// // workshop mockup
// const _workshops = [
//     {
//         "title": "Yoga indio",
//         "teacher": "Daniela Parra",
//         "description": "Unete a nuestras clases de yoga, para hacer ejercicios y sacarte el estrés que tienes dentro",
//         "image": "https://images.yogaanytime.com/2017/12/13/large_sarah_170825_YA13140_content-19948.jpg?width=768",
//         "teacherMobileNumber": "+56937827142",
//         "category": "Deportes",
//         "schedule": [
//             "Lunes 8:00 a 9:30",
//             "Miercoles 8:00 a 9:30",
//         ]
//     },

//     {
//         "title": "Baile entretenido",
//         "teacher": "Rodrigo Días",
//         "description": "Unete a nuestras clases unicas de baile entretenido",
//         "image": "https://statics-cuidateplus.marca.com/sites/default/files/images/zumba.jpg",
//         "teacherMobileNumber": "+56937827142",
//         "category": "Deportes",
//         "schedule": [
//             "Lunes 8:00 a 9:30",
//             "Miercoles 8:00 a 9:30",
//         ]
//     },

//     {
//         "title": "Clases de guitarra",
//         "teacher": "Rodrigo Valencia",
//         "description": "Unete a nuestras clases unicas de guitarra",
//         "image": "https://img.fotocommunity.com/guitar-man-ff55a084-e878-4372-a9a0-ee771a3a0fdc.jpg?height=1080",
//         "teacherMobileNumber": "+56937827142",
//         "category": "Musica",
//         "schedule": [
//             "Lunes 8:00 a 9:30",
//             "Miercoles 8:00 a 9:30",
//         ]
//     }

// ];

class AddNewGarbage extends React.Component {

    // constructor
    constructor(props) {

        // constructur of parent
        super(props);

        // initial states
        this.state = {
            loading: false,
            image: null,
            daysPickingUpGarbage: -1,
            // workshopsByCategory: null,
            // email: "",
            // password: "",
        }

        this.uploadGarbage = this.uploadGarbage.bind(this);

    }

    componentDidMount() {

        // check if user is logged
        auth.onAuthStateChanged((user) => {

            if (!user) {

                // console.log("user not logged");

                this.props.history.push('/login');

                // console.log("aosjid");

            }

            else {

                // console.log("user logged");
                // alert("user logged");

                // this.props.history.push('/login/');

                this.setState({
                    userId: user.uid,
                });

                // get number of garbage
                fs.collection('oneGarbagePerDay').doc(this.state.userId).collection("oneGarbagePerDay").
                get().then(snapshotQuery => {

                    this.setState({
                        daysPickingUpGarbage: snapshotQuery.size,
                    });

                });


            }

        });

    }

    // upload image
    uploadGarbage (event) {

        this.setState({
            loading:true,
        });

        event.preventDefault();

        const selectedFile = document.getElementById('file_input').files[0];
        
        // Create a root reference
        var storageRef = st.ref(this.state.userId + '/oneGarbagePerDay/' + selectedFile.name);

        // console.log(storageRef);

        // store file in firebase store
        storageRef.put(selectedFile).then(snapshot => {

            // get url of fiile
            return snapshot.ref.getDownloadURL();

        })

            // if it's ok
            .then(downloadURL => {

                console.log(`Successfully uploaded file and got download link - ${downloadURL}`);

                // add data to database
                fs.collection('oneGarbagePerDay').doc(this.state.userId).collection("oneGarbagePerDay").add({

                    // user: this.state.user_name,
                    // user_comment: this.state.post,
                    // comments: [],
                    // user_image: icons_users[parseInt(Math.random() * icons_users.length)],

                    // add url of image
                    image: downloadURL,
                    date: firebase.firestore.Timestamp.now(),

                }).then(ref => {

                    console.log("Added document with ID: ", ref.id)

                    // reload page
                    // window.location.reload();

                    // console.log(this);


                    // var canvas = document.getElementById("canvaImage");
                    // var img = canvas.toDataURL("image/png");
                    // document.write('<img src="' + img + '"/>');

                    var link = document.createElement('a');
                    link.download = 'onPerDay.png';
                    link.href = document.getElementById('canvaImage').toDataURL()
                    link.click();

                    // this.context.router.history.push(`/home`)
                    alert("Saved successfully! Share in your social networks to motivate more friends to help the planet!");

                    this.setState({
                        loading: false,
                    });

                    this.props.history.push('/home');

                    // var x = new XMLHttpRequest();
                    // x.open("GET", "https://api.bannerbear.com/v2/images");
                    // x.setRequestHeader("-H", "Authorization: krwrfjjCpAiQc74NRBvvMQtt");

                    // console.log(x);

                    // x.send();

                    // fetch("https://api.bannerbear.com/v2/auth", { method: "GET", headers: { "X-Authorization": "krwrfjjCpAiQc74NRBvvMQtt" } })
                    //     .then(function onRes(res) {
                    //         if (res && res.ok) {
                    //             // ..
                    //             alert("Authorized");
                    //         }
                    //     });


                    // alert("sending request");

                    // console.log(window.location.host);
                    // window.location.reload();
                    // window.location.assign(window.location.host);

                    // return(

                    // 	<Link to = "/"/>

                    // );

                })

            })

            .catch(error => {

                // Use to signal error if something goes wrong.
                console.log(`Failed to upload file and get link - ${error}`);

            });

    }

    render() {

        // return method
        return (

            <Container
                style={{
                    // margin: 20,
                    // padding: 20,
                    // backgroundColor: "red",
                }}
            >

                {
                    // !this.state.loading

                        // ?

                        <Container>

                            {/* title */}
                            <Paper
                                style={{
                                    margin: 15,
                                    padding: 5,
                                    display: "flex",
                                    flexDirection: "column"
                                }}

                                elevation={5}
                            >
                                <Typography variant="h6" component="h6" style={{ textAlign: "center", }}>

                                    Add new garbage
 
                                </Typography>

                                {/* type of garbage
                                <TextField
                                    label="Type of garbage" 
                                />                                 */}

                                {/* photo */}
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Upload File

                                    <input
                                        id = "file_input"
                                        type="file"
                                        style={{ display: "none" }}
                                        onChange = {(e) => {

                                            var canvas = document.getElementById('canvaImage');
                                            var ctx = canvas.getContext('2d');

                                            ctx.fillStyle = "white";
                                            ctx.fillRect(0, 0, canvas.width, canvas.height);


                                            const img = new Image();

                                            // img.style.width = "10px";

                                            var reader = new FileReader();

                                            // Read in the image file as a data URL.
                                            reader.readAsDataURL(e.target.files[0]);

                                            // console.log(reader);

                                            reader.onload =  (e) => {

                                                console.log("reader ready!");

                                                if (e.target.readyState == FileReader.DONE) {

                                                    img.src = e.target.result;

                                                    // set image dimensions
                                                    // img.style.width = "10px";

                                                    // ctx.width = img.width;
                                                    // ctx.height = img.height;
                                                    // ctx.width = 300;
                                                    // ctx.height = 300;
                                                    // ctxtx.drawImage(img, 0, 0, ctx.width, ctx.height);

                                                    // draw image
                                                    img.onload = () => {

                                                        // draw image
                                                        ctx.drawImage(img, 0, 100, 300, 200)
                                                        
                                                        // add text
                                                        ctx.font = "30px Verdana";
                                                        ctx.fillStyle = "black";
                                                        ctx.backgroundColor = "white"
                                                        // ctx.textAlign = "center";
                                                        ctx.fillText("#OneGarbagePerDay", 50, 50, 200);

                                                        // type of garbage
                                                        ctx.fillText("Days picking up garbage: " + this.state.daysPickingUpGarbage, 10, 350, 200);

                                                        // invitation
                                                        ctx.fillText("Get into OneGarbagePerDay to track your progress !", 10, 450, 200);

                                                        
                                                    };

                                                    
                                                }

                                                
                                            }    
                                            
                                        }}
                                    />
                                </Button>

                                {/* add new garbage */}
                                <Button variant="contained" color="primary"
                                    onClick={(e) => {
                                        // alert("Save and share on Instagram")
                                        this.uploadGarbage(e);

                                    }}
                                >
                                    Save and Share
                                </Button>

                                {this.state.loading 
                                
                                    ? 

                                        <CircularProgress color = "primary" size = {100}/>

                                    :

                                        null

                                }
                                <Container>
                                    
                                    <p>
                                        Image to share
                                    </p>

                                    <canvas 
                                        id="canvaImage"
                                        width = {300}
                                        height = {500}    
                                    />

                                </Container>

                                {/* collection of iamges */}

                            </Paper>



                        </Container>

                        // :

                        // <CircularProgress />

                }

            </Container>
        );

    }

}

export default AddNewGarbage;