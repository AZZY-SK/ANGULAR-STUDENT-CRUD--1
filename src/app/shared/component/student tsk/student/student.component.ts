import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IstudentArr } from '../../model/student';
import { studentArr } from '../../const/studentdata';
import { UuidService } from '../../services/uuid.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  constructor(private _UuidService:UuidService,
     private _MatSnackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
  }

   studentArr:IstudentArr[]=studentArr;
   editID:string=''
   Isineditmode:boolean=false;
    
 @ViewChild('fullname')fullname!:ElementRef<HTMLInputElement>;
 @ViewChild('email')email!:ElementRef<HTMLInputElement>;
 @ViewChild('course')course!:ElementRef<HTMLInputElement>;
 @ViewChild('isActive')isActive!:ElementRef<HTMLInputElement>;

 addstudent(){
     let newstudent={
         fullname:this.fullname.nativeElement.value,
         email:this.email.nativeElement.value,
         course:this.course.nativeElement.value,
         isActive:this.isActive.nativeElement.value==="true"?true:false,
         studentID:this._UuidService.uniqueId()
     }
     
     this.studentArr.unshift(newstudent);

      this.fullname.nativeElement.value=''
         this.email.nativeElement.value=''
       this.course.nativeElement.value=''
       this.isActive.nativeElement.value=''

 }
 
onedit(student:IstudentArr){
        this.fullname.nativeElement.value=student.fullname,
        this.email.nativeElement.value=student.email,
        this.course.nativeElement.value=student.course,
        this.isActive.nativeElement.value=student.isActive? "true":"false"
        this.editID=student.studentID
        this.Isineditmode=true;

}

ondelete(studentID:string){
      
      let Isconfirm=confirm(`are you sure you want to delete student details with id ${studentID}`)

      if(Isconfirm){
         let getindex=this.studentArr.findIndex(s=>s.studentID===studentID)
        this.studentArr.splice(getindex,1);

     this._MatSnackBar.open(`student with id ${studentID} deleted successfully`, `close`,{
            horizontalPosition:'left',
            verticalPosition:'top',
            duration:3000
          } )

      }
        
         
}

onupdate(){

      let updatedobj={
          fullname:this.fullname.nativeElement.value,
          email:this.email.nativeElement.value,
          course:this.course.nativeElement.value,
          isActive:this.isActive.nativeElement.value==="true"?true:false,
          studentID:this.editID
      }

      let getindex=this.studentArr.findIndex(t=>t.studentID===this.editID);

      this.studentArr[getindex]=updatedobj;

      this.fullname.nativeElement.value='';
      this.email.nativeElement.value='';
      this.course.nativeElement.value='';
      this.isActive.nativeElement.value='';

       this.Isineditmode=false;


  this._MatSnackBar.open(`student details with id ${this.editID} updated successfully`,`close`,{
       horizontalPosition:'left',
       verticalPosition:'top',
       duration:3000
  })
      

}

oncheckbox(student:IstudentArr){
  
     student.isActive=!student.isActive;

     
}

}