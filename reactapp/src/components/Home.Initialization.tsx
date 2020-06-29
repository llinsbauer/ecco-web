import * as React from "react";
import { CreateModalButton } from "./Home.Initialization.CreateModalButton";
import { OpenModalButton } from "./Home.Initialization.OpenModalButton";

export const HomeInitialization: React.FC = () => {
    return (
        <div className="col-12">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12">
                            <p className={"text-center"}>What do you want to do?</p>
                        </div>
                        <div className="col-6 text-center">
                            <CreateModalButton />
                        </div>
                        <div className="col-6 text-center">
                            <OpenModalButton />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}