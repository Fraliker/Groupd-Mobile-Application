import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from "../../providers/user-data";
import { ProjectData } from "../../providers/project-data";

import { Proj } from '../../objects/project';
import { User } from '../../objects/user';

import { ProjectPage } from "../project/project";

@Component({
  selector: 'page-search-projects',
  templateUrl: 'search-projects.html'
})
export class SearchProjectsPage {

  found: Boolean = true;

  user: User;

  query: string = "";

  projects: Proj[];

  constructor(public navCtrl: NavController, public UserData:UserData, public ProjectData:ProjectData, public navParams: NavParams) {
    this.setUserNull();
    this.getUser();
    this.getProjects();
  }

  viewProject(p : Proj){
    this.navCtrl.push(ProjectPage, {
        projectSelected: p.projectId
    });
  }
  getUser() {
    this.UserData.getCurrentUser().then((user) => {
      this.user = user;
      //always reload user in the case of changes
      this.UserData.getUser(this.user.username.toString()).subscribe(
            data => {
              if(!data.hasOwnProperty('message')){
                //user found
                this.user = data;
              }
            },
            err => {
                console.log("Unsuccessful!" + err);
                this.found = false;
            },
            () => console.log("Finished")
        );
      this.UserData.setCurrentUser(user);
    });
  }

  getProjects(){
    this.ProjectData.getAllProjects().subscribe(projects => {
      this.projects = projects;
    },
    err => {
      console.log("Unsuccessful!" + err);
      this.found = false;
    });
  }

 //reset user object
  setUserNull(){
    this.user = {
        email: null,
        username: null,
        password: null,
        firstName: null,
        surname: null,
        address: null,
        skills: [],
        bio: null,
        occupation: null,
        ratings: {
          rating: 
            {
              sum_of_rates: null,
              rate_count: null
            },
          ratedby: [
            {
              username: null,
              rate: null
            }
          ]
        },
        bookmarks: [],
        projects: []
      }
  }
}