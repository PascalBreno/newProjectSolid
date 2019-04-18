import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SolidProfile } from '../models/solid-profile.model';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';
import {CommonService} from './common.service';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit  {
  private name='';
  private address='';
  private cpf='';
  private id;
  private nome = ' ';
  profile: SolidProfile;
  profileImage: string;
  loadingProfile: Boolean;
  private email;
  private horarios;
  private dados=[];

  @ViewChild('f') cardForm: NgForm;


  constructor(private rdf: RdfService,
    private route: ActivatedRoute, private auth: AuthService,private newService :CommonService,) {}

  Repdata;
  valbutton ="Save";

  ngOnInit() {
    this.loadingProfile = true;
    this.loadProfile();
    this.teste();
    this.newService.GetUser().subscribe(data =>  this.Repdata = data)

    // Clear cached profile data
    // TODO: Remove this code and find a better way to get the old data
    localStorage.removeItem('oldProfileData');
  }

  onSave = function (user) {
    user.mode= this.valbutton;
    this.newService.saveUser(user)
        .subscribe(data =>  {  alert(data.data);

              this.ngOnInit();
            }
            , error => this.errorMessage = error )

  }
  edit = function(kk) {
    this.id = kk._id;
    this.name= kk.name;
    this.address= kk.address;
    this.cpf= kk.cpf;
    this.valbutton ="Update";
  }
  //deleta
  delete = function(id) {
    this.newService.deleteUser(id)
        .subscribe(data =>   { alert(data.data) ; this.ngOnInit();}, error => this.errorMessage = error )
  }
  // Loads the profile from the rdf service and handles the response
  async loadProfile() {
    try {
      this.loadingProfile = true;
      const profile = await this.rdf.getProfile();
      if (profile) {
        this.profile = profile;
        this.auth.saveOldUserData(profile);
      }

      this.loadingProfile = false;
      this.setupProfileData();
    } catch (error) {
      console.log(`Error: ${error}`);
    }

  }

  async  teste(){
    let response = await fetch("http://localhost:8080/card", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    this.dados.push(await response.json())
  }

  async adicionar(){

    this.horarios.push(this.horarios);
    this.email.push(this.email);
    let response = await fetch("http://localhost:8080/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: new FormData(document.querySelector(this.email+this.horarios))
    }).then(function(response){
      console.log(response.json)
      // trate a resposta aqui
    })


  }

  // Submits the form, and saves the profile data using the auth/rdf service
  async onSubmit () {
    if (!this.cardForm.invalid) {
      try {
        await this.rdf.updateProfile(this.cardForm);
        localStorage.setItem('oldProfileData', JSON.stringify(this.profile));
      } catch (err) {
        console.log(`Error: ${err}`);
      }
    }
  }

  // Format data coming back from server. Intended purpose is to replace profile image with default if it's missing
  // and potentially format the address if we need to reformat it for this UI
  private setupProfileData() {
    if (this.profile) {
      this.profileImage = this.profile.image ? this.profile.image : '/assets/images/profile.png';
    } else {
      this.profileImage = '/assets/images/profile.png';
    }
  }

  // Example of logout functionality. Normally wouldn't be triggered by clicking the profile picture.
  logout() {
    this.auth.solidSignOut();
  }

  outroMenu() {
  }
}
