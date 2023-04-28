import React from 'react';
import {SyncLoader} from "react-spinners";

const SyncLoading = () => {
    return (
        <div className="loading--container" style={{
            position: 'relative',
            height: '360px'
        }}>
            <div style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: '50%',
            }}>
                <SyncLoader 
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly"
                    }}  
                    color="var(--mainColor)" 
                />
                <p
                    style={{
                        marginTop: '15px',
                        fontSize: '16px',
                        color: 'var(--mainColor)',
                    }}
                >Chờ chút nhé ...</p>
            </div>
        </div>
    );
}

export default SyncLoading;
