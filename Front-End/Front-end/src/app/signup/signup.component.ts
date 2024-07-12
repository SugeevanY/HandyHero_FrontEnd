import {Component} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {SignUpService} from "../../Services/sign-up.service";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgStyle,
    RouterLink,
    RouterLinkActive,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  buttonText = "Sign Up"

  name = "";
  email = '';
  phoneNumber = '';
  password = '';
  confirmPassword = '';
  role = '';

  district = '';
  dob = '';
  workType = '';

  nameError = '';
  emailError = '';
  phoneNumberError = '';
  passwordError = '';
  confirmPasswordError = '';
  roleError = '';

  dobError = '';
  workTypeError = '';
  districtError = '';
  profileFileError :string =  "error";
  nicFileError :string =  "error";
  certificateFileError :string =  "error";
  experienceLettersFileError :string =  "error";
  certificatesFile: File | undefined;
  experienceLettersFile: File | undefined;
  NICFile: File | undefined;
  profileFile: File | undefined;

  constructor(private sign: SignUpService, private router:Router) {
  }


  isEmpty(text: any) {
    return text.trim() == '';
  }

  onNameChange(event: any) {
    this.name = event.target.value;
    if (this.isEmpty(event.target.value)) {
      this.nameError = "Name is required"
    } else {
      this.nameError = "";
    }
  }

  onEmail(event: any) {
    this.email = event.target.value;
    if (this.isEmpty(event.target.value)) {
      this.emailError = "Email is required"
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (emailRegex.test(event.target.value)) {
        this.emailError = ""
      } else {
        this.emailError = "Please Enter a valid format email";
      }
    }
  }

  onPhoneNumberChange(event: any) {
    this.phoneNumber = event.target.value;
    if (this.isEmpty(event.target.value)) {
      this.phoneNumberError = "Phone number is required"
    } else {
      this.phoneNumberError = "";
    }
  }

  onPassword(event: any) {
    this.password = event.target.value;
    if (this.isEmpty(event.target.value)) {
      this.passwordError = "Password is required"
    } else {
      this.passwordError = "";
    }
  }

  onConfirmPasswordChange(event: any) {
    this.confirmPassword = event.target.value;
    if (event.target.value != this.password) {
      this.confirmPasswordError = "Confirm password does not matched"
    } else {
      this.confirmPasswordError = "";
    }
  }


  onRoleChange(event: any) {
    this.role = event.target.value;
    if (this.role.trim() == '') {
      this.roleError = "You must want to select Your User Role"
    } else {
      if (this.role == 'fieldWorker') {
        this.buttonText = "Request"
      } else {
        this.buttonText = "Sign Up"
      }
    }
  }

  onDistrictChange(event: any){
    this.district = event.target.value;
    if (this.district.trim() == ''){
      this.districtError = "Please enter valid district"
    }else {
      this.district = "";
    }
  }

  onDOBChange(event:any){
    this.dob = event.target.value;
    if (this.dob.trim() == ''){
      this.dobError = "Please enter valid date"
    }else {
      this.dobError = "";
    }
  }

  onWorkTypeChange(event:any){
    this.workType = event.target.value;
    if (this.workType.trim() == ''){
      this.workTypeError = "Please select what type work you can"
    }else {
      this.workTypeError = '';
    }
  }

  onProfilePhotoChange(event: any) {
    if (!(this.profileFile = event.target.files[0])){
      this.profileFileError = "error"
    }else {
      this.profileFileError= '';
    }
  }

  // Method to handle NIC file input change
  onNICChange(event: any) {
    if (!(this.NICFile = event.target.files[0])){
      this.nicFileError = "error"
    }else {
      this.nicFileError= '';
    }
  }

  // Method to handle certificates file input change
  onCertificatesChange(event: any) {
    if (!(this.certificatesFile = event.target.files[0])){
      this.certificateFileError = "error"
    }else {
      this.certificateFileError= '';
    }

  }

  // Method to handle experience letter file input change
  onExperienceLetterChange(event: any) {
    if (!(this.experienceLettersFile = event.target.files[0])){
      this.experienceLettersFileError = "error"
    }else {
      this.experienceLettersFileError= '';
    }

  }

  signup() {
    if (this.role == 'customer') {
      if (
        this.nameError.trim() == '' &&
        this.emailError.trim() == '' &&
        this.phoneNumberError.trim() == '' &&
        this.passwordError.trim() == '' &&
        this.confirmPasswordError.trim() == '' &&
        this.roleError.trim() == ''
      ) {
        let signupData = {
          Name: this.name,
          Email: this.email,
          PhoneNumber: this.phoneNumber,
          Password: this.password,
        };
        this.sign.customerSignup(signupData).subscribe(
          response => {
            alert("Your Account is created")
            this.router.navigate(['auth/login'])
          },
          error => {
            console.error("Error while customer creating account", error);
          }
        );
      }
    } else if (this.role == 'fieldWorker') {
      if (
        this.nameError.trim() == '' &&
        this.emailError.trim() == '' &&
        this.phoneNumberError.trim() == '' &&
        this.passwordError.trim() == '' &&
        this.confirmPasswordError.trim() == '' &&
        this.roleError.trim() == '' &&
        this.workTypeError.trim() == '' &&
        this.dobError.trim() == ''
      ) {
        const formData = new FormData();

        // Append other form data
        formData.append('Name', this.name);
        formData.append('Email', this.email);
        formData.append('PhoneNumber', this.phoneNumber);
        formData.append('Password', this.password);
        formData.append('Role', this.role);
        formData.append('WorkType', this.workType);
        formData.append('DOB', this.dob);
        formData.append('District', this.district);

        if (this.certificatesFile) {
          formData.append('certificates', this.certificatesFile);
        }
        if (this.experienceLettersFile) {
          formData.append('experienceLetters', this.experienceLettersFile);
        }
        if (this.NICFile) {
          formData.append('NIC', this.NICFile);
        }
        if (this.profileFile) {
          formData.append('profile', this.profileFile);
        }

        this.sign.fieldWorkerSignup(formData).subscribe(
          response => {
            alert("Your Request is forwarded");
            this.router.navigate(['auth/login'])
          },
          error => {
            console.error("Error while field worker creating account", error);
          }
        );
      }
    } else {
      console.log("Please select a valid user role");
    }
  }




}
