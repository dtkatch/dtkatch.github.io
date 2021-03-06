(function ( hero_theta, hero_x, hero_y, hero_dx, hero_dy, ball_x, ball_y, ball_dx, ball_dy, evil_x, evil_y ) {

    // var side_length = Math.min(window.availWidth,window.availHeight) - 100;

    // alert(side_length);

    // land.style.width = side_length + 'px';
    // land.style.height = side_length + 'px';

    // alert(land.style.width);

    // "<div id="hero" style="border: 1px solid rgb(0, 0, 0); 
    // background: none repeat scroll 0% 0% rgb(255, 255, 0); 
    // transform: matrix(0.980067, -0.198669, 0.198669, 0.980067, 351.59, 97.6276);"></div>"

    // Error in parsing value for '-moz-transform'.  Declaration dropped. dtkatch.github.io
    // 21:58:32.666 Use of getUserData() or setUserData() is deprecated.  Use WeakMap or element.dataset instead.

    // document.getElementById("land").style.width = side_length;
    // document.getElementById("land").style.height = side_length;

    var land_width = parseFloat(document.getElementById("land").style.width);
    var land_height = parseFloat(document.getElementById("land").style.height);

    var hero_speed = 2;
    var ball_speed = 3;
    var hero_move;
    var ball_move;
    var key;
    var solo = 0;
    var evil_dx = 0; 
    var evil_dy = 0;

    var tick = function ()
    {
        // alert(document.body.clientHeight);
        // alert(document.body.clientWidth);

        hero_dx = Math.cos(hero_theta);
        hero_dy = Math.sin(hero_theta);
        hero_x += hero_speed * hero_dx;
        hero_y += hero_speed * hero_dy;
        hero_x += land_width;
        hero_y += land_height;
        hero_x %= land_width;
        hero_y %= land_height;
        hero_move = 'matrix(' + hero_dx + ',' + hero_dy + ',' + -hero_dy + ',' + hero_dx + ',' + hero_x + ',' + hero_y + ')';
        hero.style.MozTransform = hero_move;
        hero.style.WebkitTransform = hero_move;
        hero.style.msTransform = hero_move;

        ball_x += ball_dx;
        ball_y += ball_dy;
        ball_x += land_width;
        ball_y += land_height;
        ball_x %= land_width;
        ball_y %= land_height;
        ball_move = 'matrix(1,0,0,1,' + ball_x + ',' + ball_y + ')';
        ball.style.MozTransform = ball_move;
        ball.style.WebkitTransform = ball_move;
        ball.style.msTransform = ball_move;

        evil_x += land_width;
        evil_y += land_height;
        evil_x %= land_width;
        evil_y %= land_height;
        evil_move = 'matrix(1,0,0,1,' + evil_x + ',' + evil_y + ')';
        evil.style.MozTransform = evil_move;
        evil.style.WebkitTransform = evil_move;
        evil.style.msTransform = evil_move;

        if( solo ){
            if( Math.random() > 0.8 ){
                evil_dx = Math.random() * 10 - 5;
                evil_dy = Math.random() * 10 - 5;
            }
            evil_x += evil_dx;
            evil_y += evil_dy;
        }

        if( Math.abs(hero_x - evil_x) + Math.abs(hero_y - evil_y) < 50 ){
            hero.style.background = '#f00';
        }

        if( Math.abs(ball_x - evil_x) + Math.abs(ball_y - evil_y) < 50 ){
            evil.style.background = '#f00';
        }
    }

    var controller = function (e)
    {
        key = String.fromCharCode( e.charCode || e.keyCode );
        if ( key==' ' ){
            ball_x = hero_x;
            ball_y = hero_y;
            ball_dx = ball_speed * hero_speed * hero_dx;
            ball_dy = ball_speed * hero_speed * hero_dy;
            ball.style.border = '1px solid #000';
            ball.style.background = '#0f0';
            ball.style.border = '1px solid #000';
        }
        if ( key=='a' ) hero_theta -= 0.2;
        if ( key=='d' ) hero_theta += 0.2;
        if ( key=='i' ) evil_y -= 10;
        if ( key=='j' ) evil_x -= 10;
        if ( key=='k' ) evil_y += 10;
        if ( key=='l' ) evil_x += 10;
    }

    var detector = function(e)
    {
        hero.style.background = '#00f';
    }

    var steer = function(e)
    {
        if ( 5 < e.alpha && e.alpha < 90 ) hero_theta -= 0.2;
        if ( 270 < e.alpha && e.alpha < 355 ) hero_theta += 0.2;
    }

    var shoot = function(e)
    {
        if( e.acceleration.z < -10 ){
            ball_x = hero_x;
            ball_y = hero_y;
            ball_dx = ball_speed * hero_speed * hero_dx;
            ball_dy = ball_speed * hero_speed * hero_dy;
            ball.style.border = '1px solid #000';
            ball.style.background = '#0f0';
            ball.style.border = '1px solid #000';
        }
    }


    document.addEventListener('keypress', controller, false);
    window.ondevicemotion = shoot;
    window.ondeviceorientation = steer;

    var timer = setInterval(tick, 1000/60); 

} (0,0,0,0,0,0,0,0,0,300,300));

