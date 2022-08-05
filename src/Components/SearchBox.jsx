import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchBox(props) {
    const { selectPosition, setSelectPosition } = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);

    console.log("selectPosition", selectPosition);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <OutlinedInput
                        style={{ width: "100%", background: "white", marginTop: "10px" }}
                        value={searchText}
                        placeholder="Search country or city...."
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                    />
                </div>
                <div
                    style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            // Search
                            const params = {
                                q: searchText,
                                format: "json",
                                addressdetails: 1,
                                polygon_geojson: 0,
                            };
                            const queryString = new URLSearchParams(params).toString();
                            const requestOptions = {
                                method: "GET",
                                redirect: "follow",
                            };
                            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                                .then((response) => response.text())
                                .then((result) => {
                                    console.log(JSON.parse(result));
                                    setListPlace(JSON.parse(result));
                                })
                                .catch((err) => console.log("err: ", err));
                        }}
                    >
                        Search
                    </Button>
                </div>
            </div>
            <div>
                <List component="nav" aria-label="main mailbox folders" sx={{
                    width: '100%',
                    maxWidth: 500,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'scroll',
                    maxHeight: 380,
                    '& ul': { padding: 0 },
                }} >
                    {listPlace.map((item) => {
                        return (
                            <div key={item.place_id}>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setSelectPosition(item);
                                    }}
                                >
                                    <ListItemIcon>
                                        <img
                                            src="./location.png"
                                            alt=""
                                            style={{ width: 38, height: 38 }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={item.display_name} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                </List>
            </div>

        </div>
    );
}
