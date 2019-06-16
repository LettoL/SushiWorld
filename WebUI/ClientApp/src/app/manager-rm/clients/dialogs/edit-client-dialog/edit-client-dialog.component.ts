import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IClient } from '../../shared/models/client.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.component.html',
  styleUrls: ['./edit-client-dialog.component.sass']
})
export class EditClientDialogComponent implements OnInit {

  save(){
    console.log(this.data);
    this.dialogRef.close(this.data)
  }

  close(){
    this.dialogRef.close();
  }

  constructor(
      public dialogRef: MatDialogRef<EditClientDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IClient
    ) { }

  ngOnInit() {
  }

}
