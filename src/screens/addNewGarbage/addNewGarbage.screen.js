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
    CircularProgress,
    Select,
    MenuItem,
    InputLabel,
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

// load image
// import imageDesign from '../../static/images/oneGarbagePerDay.png';

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

// define language
const imageTextLanguages = [
    "English",
    "Spanish",
];

// garbage types
const garbageTypes = [
    "other",
    "plastic",
    "paper/card",
    "tin/metal",
    "ceramic/glass",
    "organic",
    "textile",
]

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

            // language to share image
            imageTextLanguage: 0,

            // garbage type
            garbageType: 0,
            
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
                    garbageType: garbageTypes[this.state.garbageType],

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
                              

                                {/* type of garbage */}
                                <InputLabel>
                                    Garbage type
                                </InputLabel>
                                <Select
                                    // labelId="demo-simple-select-label"
                                    // id="demo-simple-select"
                                    placeholder="iojasd"
                                    value={this.state.garbageType}
                                    onChange={(e) => {
                                        this.setState({
                                            garbageType: e.target.value,
                                        });
                                    }}
                                >
                                    {
                                        garbageTypes.map((item, index) => {

                                            return (

                                                <MenuItem value={index} key={index}>
                                                    {item}
                                                </MenuItem>
                                            )

                                        })
                                    }
                                </Select> 

                                {/* image to share language */}
                                <Typography variant="body2" component="p">
                                    Image's text language:
                                        </Typography>

                                {/* <Select
                                    // labelId="demo-simple-select-label"
                                    // id="demo-simple-select"
                                    value={this.state.imageTextLanguage}
                                    onChange={(e) => {
                                        this.setState({
                                            imageTextLanguage: e.target.value,
                                        });
                                    }}
                                >
                                    {
                                        imageTextLanguages.map((item, index) => {

                                            return (

                                                <MenuItem value={index} key={index}>
                                                    {item}
                                                </MenuItem>
                                            )

                                        })
                                    }
                                </Select> */}

                                {/* photo */}
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Upload photo

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

                                            img.crossOrigin = "anonymous";
                                            // crossorigin = "anonymous"

                                            // img.style.width = "10px";

                                            var reader = new FileReader();

                                            // Read in the image file as a data URL.
                                            reader.readAsDataURL(e.target.files[0]);

                                            // console.log(reader);

                                            reader.onload =  (e) => {

                                                // console.log("reader ready!");

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

                                                        // draw user image
                                                        // ctx.drawImage(img, 0, 130, 300, 200)
                                                        

                                                        // draw design image
                                                        var designImage = new Image();

                                                        // design image
                                                        // designImage.src = "https://firebasestorage.googleapis.com/v0/b/oneperday-1758a.appspot.com/o/website%2FonePerDayDesign.png?alt=media&token=a97a7667-c8ec-45bb-8d80-d8fda84263bf";
                                                        // imageDesign.src = imageDesign.src;
                                                        // designImage.src = "https://static.iris.net.co/semana/upload/images/2020/4/7/662138_1.jpg";
                                                        designImage.src = "https://github.com/leoBravoRain/onePerDay/blob/master/onePerDayDesign.png?raw=true";
                                                        // designImage.src = img.src;
                                                        
                                                        // designImage.crossOrigin = "anonymous";

                                                        // load image
                                                        designImage.onload = () => {

                                                            // draw design image
                                                            ctx.drawImage(designImage, 0, 0, 400, 500);

                                                            // draw user image
                                                            ctx.drawImage(img, 50, 175, 300, 150)

                                                            // garbage type
                                                            ctx.font = "20px Verdana";
                                                            ctx.fillStyle = "white";
                                                            ctx.fillText(garbageTypes[this.state.garbageType], 250, 350);

                                                            // days
                                                            ctx.font = "20px Verdana";
                                                            ctx.fillStyle = "white";
                                                            ctx.fillText(this.state.daysPickingUpGarbage, 193, 415);
                                                        };

                                                        // // define text based on language
                                                        // var title = "";
                                                        // var explanation_1 = "";
                                                        // var explanation_2 = "";
                                                        // var today = "";
                                                        // var days_1 = "";
                                                        // var days_2 = "";
                                                        // var join_1 = "";
                                                        // var join_2 = "";
                                                        // var garbageType = "";

                                                        // // English
                                                        // if (this.state.imageTextLanguage == 0) {

                                                        //     title = "#OneGarbagePerDay";
                                                        //     explanation_1 = "I am picking up one garbage per day from my city";
                                                        //     explanation_2 = "in order to help our planet to keep clean and healthy";
                                                        //     today = "This is the one I picked up today:";
                                                        //     days_1 = "These are the days when ";
                                                        //     days_2 = "I've been picking up trash: ";
                                                        //     join_1 = "If you want to join me, please go to";
                                                        //     join_2 = "OneGarbagePerDay!";
                                                        //     garbageType = "Type of garbage: " + garbageTypes[this.state.garbageType];
                                                            
                                                        // }

                                                        // // spanish
                                                        // else if (this.state.imageTextLanguage == 1) {

                                                        //     title = "#UnaBasuraPorDía";
                                                        //     explanation_1 = "Estoy recogiendo una basura por día en mi ciudad";
                                                        //     explanation_2 = "para poder mantener nuestro planeta limpio y saludable";
                                                        //     today = "Esto recogí hoy día:";
                                                        //     days_1 = "Estos son los días en que ";
                                                        //     days_2 = "he estado recogiendo basura: ";
                                                        //     join_1 = "Si quieres unirte, visita";
                                                        //     join_2 = "UnaBasuraPorDía!";

                                                        //     // transalte type of garbage name
                                                        //     garbageType = "Tipo de basura: " + garbageTypes[this.state.garbageType];

                                                        // }

                                                        // // add text
                                                        // ctx.font = "30px Verdana";
                                                        // ctx.fillStyle = "black";
                                                        // ctx.backgroundColor = "white"
                                                        // // ctx.textAlign = "center";
                                                        // ctx.fillText(title, 50, 50, 200);

                                                        // // add text: I am picking up one garbage per day from my city in order to help our planet to keep clean and healthy
                                                        // ctx.font = "10px Verdana";
                                                        // ctx.fillText(explanation_1, 10, 90);
                                                        // ctx.fillText(explanation_2, 10, 100);

                                                        // // today's message
                                                        // ctx.font = "12px Verdana";
                                                        // ctx.fillStyle = "red";
                                                        // ctx.fillText(today, 50, 120);

                                                        // // type of garbage
                                                        // ctx.font = "12px Verdana";
                                                        // ctx.fillStyle = "black";
                                                        // ctx.fillText(garbageType, 50, 360);

                                                        // // days picking up garbage
                                                        // ctx.font = "12px Verdana";
                                                        // ctx.fillStyle = "green";
                                                        // ctx.fillText(days_1, 60, 390);
                                                        // ctx.fillText(days_2 + (this.state.daysPickingUpGarbage + 1), 60, 410);

                                                        // // invitation
                                                        // ctx.font = "11px Verdana";
                                                        // ctx.fillStyle = "black";
                                                        // ctx.fillText(join_1, 40, 450);
                                                        // ctx.fillText(join_2, 70, 470);

                                                        
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

                                {/* Image to share */}
                                <Container>
                                    
                                    {/* title */}
                                    <Typography variant="h6" component="h6" style={{ textAlign: "center", }}>
                                        Image to share
                                    </Typography>

                                    {/* select language */}

                                    
                                

                                    {/* canva image to share */}

                                    <Container>

                                        <canvas 
                                            // onload = {() => alert("oajsd")}
                                            id="canvaImage"
                                            width = {400}
                                            height = {500}    
                                        />
                                        
                                    </Container>



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