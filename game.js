(function ( hero_theta, hero_x, hero_y, hero_dx, hero_dy, ball_x, ball_y, ball_dx, ball_dy, evil_x, evil_y ) {

    // var land_width = $('#land').attr('width');
    // var land_height = $('#land').attr('height');

    // discretization can always be made smaller

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
        hero_dx = Math.cos(hero_theta);
        hero_dy = Math.sin(hero_theta);
        hero_x += hero_speed * hero_dx;
        hero_y += hero_speed * hero_dy;
        hero_x += land_width;
        hero_y += land_height;
        hero_x %= land_width;
        hero_y %= land_height;
        hero_move = 'matrix(' + hero_dx + ',' + hero_dy + ',' + (-hero_dy) + ',' + hero_dx + ',' + hero_x + ',' + hero_y + ')';
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
            // hero.style.border = '1px solid #f00';
            hero.style.background = '#f00';
        }

        if( Math.abs(ball_x - evil_x) + Math.abs(ball_y - evil_y) < 50 ){
            // evil.style.border = '1px solid #f00';
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
        hero.style.background = '#0ff';
    }

    document.addEventListener('keypress', controller, false);
    // document.addEventListener('keydown', controller, false);
    // document.addEventListener('keyup', controller, false);

    document.addEventListener('devicemotion', detector, false);
    document.addEventListener('deviceorientation', detector, false);
    document.addEventListener('touchmove', detector, false);
    document.addEventListener('touchstart', detector, false);
    document.addEventListener('touchcancel', detector, false);
    document.addEventListener('touchend', detector, false);

    var timer = setInterval(tick, 1000/60); 

} (0,0,0,0,0,0,0,0,0,300,300));


        // TODO:
        // - implement death
        // - implement resurrection via page refresh
        // - implement multiplayer
        // - fix Error in parsing value for '-moz-transform'.  Declaration dropped. bug
        // - fix hotseat controls
