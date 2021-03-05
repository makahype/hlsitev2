declare var move: any;

import { Component } from '@angular/core';
import { DancingdotsService } from './dancingdots.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  title = 'app';
  phrase = '';
  state = 0;
  
  //some shared values
  mid_x = 0;
  mid_y = 0;
  radius = 0;
  angle1 = 0;
  angle2 = 0;
  angle3 = 0;

  dot1: HTMLElement;
  dot2: HTMLElement;
  dot3: HTMLElement;

  constructor(private ddots: DancingdotsService){
  }
 
  ngOnInit() {
    //set default values
    this.phrase = "Quality Solved";
    this.mid_x = 220;
    this.mid_y = 105;
    this.radius = 100;

    this.angle1 = 270;
    this.angle2 = 30;
    this.angle3 = 150;


    var init_pos = [];
    init_pos.push({
      id: 'dot1',
      left: this.mid_x + this.radius * Math.cos(this.angle1 * Math.PI / 180),
      top: this.mid_y + this.radius * Math.sin(this.angle1 * Math.PI / 180)
    });

    init_pos.push({
      id: 'dot2',
      left: this.mid_x + this.radius * Math.cos(this.angle2 * Math.PI / 180),
      top: this.mid_y + this.radius * Math.sin(this.angle2 * Math.PI / 180) 
    });

    init_pos.push({
      id: 'dot3',
      left: this.mid_x + this.radius * Math.cos(this.angle3 * Math.PI / 180) ,
      top: this.mid_y + this.radius * Math.sin(this.angle3 * Math.PI / 180)
    });


    this.ddots.initObjs(init_pos);

    //define animations
    this.defineAnimation();

    //begin animation
    setTimeout(()=>{this.beginAnimation()},1000);
  }



  defineAnimation() {


    //======
    //animation 1

    var ani1: any;
    ani1 = {};
    ani1.time = 4000;
    ani1.type = 'simple';
    ani1.animations = [];
    ani1.animations.push({
      id: 'dot1',
      opacity: 100,
      duration: 2
    });

    ani1.animations.push({
      id: 'dot2',
      opacity: 100,
      duration: 2
    });

    ani1.animations.push({
      id: 'dot3',
      opacity: 100,
      duration: 2
    });    

    this.ddots.addState(ani1);


    //======
    //animation 2

    var ani2: any;
    ani2 = {};
    ani2.time = 700 * 30;
    ani2.type = 'waltz';
    ani2.default_angle = 1;
    ani2.spin_speed = {50:3, 100: 5, 200: 10, 300: 20, 450: 10, 520: 5, 600: 3, 
    650: 0};
    ani2.animations = [];
    ani2.animations.push({
      id: 'dot1',
      mid_x: this.mid_x,
      mid_y: this.mid_y,
      angle: this.angle1,
      radius: this.radius 
    });

    ani2.animations.push({
      id: 'dot2',
      mid_x: this.mid_x,
      mid_y: this.mid_y,      
      angle: this.angle2,
      radius: this.radius
    });

    ani2.animations.push({
      id: 'dot3',
      mid_x: this.mid_x,
      mid_y: this.mid_y,
      angle: this.angle3,
      radius: this.radius
    });

    this.ddots.addState(ani2);



    //======
    //animation 3

    var ani3: any;
    ani3 = {};
    ani3.time = 6000;
    ani3.type = 'simple';
    ani3.animations = [];
    ani3.animations.push({
      id: 'triangle',
      opacity: 100,
      duration: 5
    });

    ani3.animations.push({
      id: 'dot1',
      opacity: 0,
      duration: 2
    });


    ani3.animations.push({
      id: 'dot2',
      opacity: 0,
      duration: 2
    });


    ani3.animations.push({
      id: 'dot3',
      opacity: 0,
      duration: 2
    });


    this.ddots.addState(ani3);


    //======
    //animation 4

    var ani4: any;
    ani4 = {};
    ani4.time = 4000;
    ani4.type = 'simple';
    ani4.animations = [];
    ani4.animations.push({
      id: 'circle',
      opacity: 100,
      duration: 3
    });

    this.ddots.addState(ani4);



    //======
    //animation 5

    var ani5: any;
    ani5 = {};
    ani5.time = 6000;
    ani5.type = 'simple';
    ani5.animations = [];
    ani5.animations.push({
      id: 'phrase',
      opacity: 100,
      duration: 5
    });

    this.ddots.addState(ani5);

  }


  beginAnimation() {

    this.ddots.performDance();

  }



}
