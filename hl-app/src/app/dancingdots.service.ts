//use external css animation lib
declare var move: any;

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DancingdotsService {

    states = [];
    currentState = 0;

    constructor() { }


    //take in an array of css descriptions to apply
    //to the initial state
    initObjs(dot_inits: any) {

        dot_inits.forEach(function(item) {

            var dot = document.getElementById(item.id);
            dot.style.left = item.left + "px";
            dot.style.top = item.top + "px";           

        });

    }

    //add a new state to the list
    addState(state) {
        this.states.push(state);
    }


    performDance() {

        //only animate if there is a unfinished state
        if(this.currentState < this.states.length) {

            //get the description of the current state
            var state = this.states[this.currentState];

            //execute the animations
            var typedance = state.type + 'Dance';
            this[typedance](state.animations);

            //advance to new state with thish states timer is up
            setTimeout(() => {
                this.currentState++;
                this.performDance();
            }, state.time);


        }


    }




    //====================
    //supporting functions
    //====================


    simpleDance(animations: any) {

        animations.forEach(function(item){

            move('#'+item.id)
            .set('opacity', item.opacity)
            .duration(item.duration+'s')
            .end();

        });

    }


    waltzDance(animations: any) {

        //extra info for the animation
        var state = this.states[this.currentState];        
        var delta_angle = state.default_angle;
        var timer = 0;


        var dance_in_circles = function() {

            //change spin speed if desired
            if(state.spin_speed[timer]){
                delta_angle = state.spin_speed[timer]
            }


            animations.forEach(function(item){

                //change angle for this item
                item.angle = item.angle + delta_angle;
                if(item.angle >= 360){
                    item.angle = 0;
                }

                //use angle to calculate placement
                var dot = document.getElementById(item.id);
                dot.style.left = item.mid_x + item.radius * Math.cos(item.angle * Math.PI / 180) + "px";
                dot.style.top = item.mid_y + item.radius * Math.sin(item.angle * Math.PI / 180) + "px";                           

            });


            //increment timer
            timer++;

            //stop animation
            if(timer * 30 < state.time){
                setTimeout(()=>{dance_in_circles()}, 30);
            }

        }

        //start waltz
        setTimeout(()=>{dance_in_circles()}, 100);        

    }



}
