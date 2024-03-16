"use strict";

namespace core
{
    export class Router {

        private _activeLink : string;
        private _routingTable : string [];

        private _linkData: string;


        /**
         * Creates an instance of the Router
         */
        constructor() {
            this._activeLink = "";
            this._routingTable = [];
            this._linkData = "";
        }

        public get LinkData() : string {
            return this._linkData;
        }

        public set LinkData(linkData: string){
            this._linkData = linkData;
        }

        public get ActiveLink() : string {
            return this._activeLink;
        }

        public set ActiveLink(link: string){
            this._activeLink = link;
        }

        /**
         * This method adds a new route to the Routing Table
         * @param route
         * @returns {void}
         */
        public Add(route : string ) : void{
            this._routingTable.push(route);
        }

        /**
         * This method replaces the reference for the Routing table with a new one
         * Note: Routes shoud begin with a "/" character
         * @param routingTable
         * @returns {void}
         * @returns {void}
         */
        public AddTable(routingTable : string[]) : void{
            this._routingTable = routingTable;
        }

        /**
         * This method find and returns the index of the route in the Routing Table, otherwise it returns -1 if the
         * route is not found
         * @param route
         * @returns {number}
         */
        public Find(route : string) : number{
            return this._routingTable.indexOf(route);
        }

        /**
         * This method removes a Route from the Routing table. It returns true if the route was successfully removed
         * @param route
         * @returns {boolean}
         */
        public Remove(route : string) : boolean {
            if(this.Find(route) > -1){
                this._routingTable.splice(this.Find(route), 1)
                return true;
            }
            return false;
        }

        /**
         * This method returns the routing table contents in a common separated string
         * @override
         * @returns {string}
         */
        public toString() : string{
            return this._routingTable.toString();
        }

    }

}

let router : core.Router = new core.Router();

router.AddTable( [
    "/",
    "/home",
    "/about",
    "/services",
    "/contact",
    "/contact-list",
    "/products",
    "/register",
    "/login",
    "/edit"
]);

let route : string = location.pathname

router.ActiveLink = (router.Find(route) > -1)
    ? ( (route == "/") ? "home" : route.substring(1) )
    : ("404");