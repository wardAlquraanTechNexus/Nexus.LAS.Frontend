import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings-taps-component',
  standalone: false,
  templateUrl: './settings-taps-component.html',
  styleUrl: './settings-taps-component.scss'
})
export class SettingsTapsComponent implements OnInit {

  groupId!: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  )
  {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = +params['id'];
    })
  }



}
