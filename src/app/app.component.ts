import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  @ViewChild('myModal') model: ElementRef | undefined;
  studentObj: Student = new Student();
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem("angular17crud");
    if (localData != null) {
      this.studentList = JSON.parse(localData)
    }
  }

  openModel() {
    const model = document.getElementById("myModal");
    if (model != null) {
      model.style.display = 'block'
    }
  }

  // closeModel(): void {
  //   const modalElement = document.getElementById('myModal'); // Replace 'myModal' with the id of your modal
  //   if (modalElement) {
  //     modalElement.classList.remove('show');
  //     modalElement.setAttribute('aria-hidden', 'true');
  //     modalElement.style.display = 'none';
  //     document.body.classList.remove('modal-open');
  //   }
  // }

  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }

  saveStudent() {
    const isLocalPresent = localStorage.getItem("angular17crud");
    if (isLocalPresent != null) {
      const oldArray = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArray.length + 1;
      oldArray.push(this.studentObj);
      this.studentList = oldArray;
      localStorage.setItem('angular17crud', JSON.stringify(oldArray));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModel()
  }

  updateStud() {
    const currentRecord = this.studentList.find(m => m.id === this.studentObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.mobileNo = this.studentObj.mobileNo;
    };
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel()
  }

  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }

  onDelete(itme: Student) {
    const isDelet = confirm("Are you sure want to Delete");
    if (isDelet) {
      const currentRecord = this.studentList.findIndex(m => m.id === this.studentObj.id);
      this.studentList.splice(currentRecord, 1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }
}

export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  zipCode: string;
  address: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.zipCode = '';
    this.address = '';
  }
}
