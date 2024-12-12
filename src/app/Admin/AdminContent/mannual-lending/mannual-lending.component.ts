import { Component, inject, OnInit, signal } from '@angular/core';
import { MannualLendingService } from '../../../_service/mannual-lending.service';
import { AllUsers } from '../../../_Inerface/MannualLending';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mannual-lending',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './mannual-lending.component.html',
  styleUrl: './mannual-lending.component.css'
})
export class MannualLendingComponent implements OnInit {
  AllusersSignal = signal<AllUsers[]>([])
  ManualLendingService = inject(MannualLendingService)
  taoster = inject(ToastrService)
  router = inject(Router)

  ngOnInit(): void {
    if (this.AllusersSignal.length == 0) {
      this.loadAllUsers('')
    }
  }
  searchText: string = ''
  loadAllUsers(text: string) {
    this.ManualLendingService.GetAllUsers(text).subscribe({
      next: res => {
        this.AllusersSignal.set(res)
      },
      error: err => {
        this.taoster.error(err)
      }
    })
  }

  user = {
    nic: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  };

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nic: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  submitUserForm() {
    if (this.userForm.valid) {
      console.log('User Info:', this.userForm.value);
      this.ManualLendingService.AddNewUser(this.userForm.value).subscribe({
        next: res => {
          this.taoster.success("User added successfully")
          this.loadAllUsers('')
        },
        error: err => {
          this.taoster.error(err)
        }
      })
    } else {
      console.log('Form is not valid!');
    }
  }

  ViewBookDetails(UserId:number){
    this.router.navigateByUrl(`/admin/View-allBook/${UserId}`)
  }
}
