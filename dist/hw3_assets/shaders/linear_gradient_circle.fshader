precision mediump float;

varying vec4 v_Position;

uniform vec4 circle_Color;
uniform vec4 circle_Color_Secondary;

// HOMEWORK 3 - TODO
/*
	The fragment shader is where pixel colors are decided.
	You'll have to modify this code to make the circle vary between 2 colors.
	Currently this will render the exact same thing as the gradient_circle shaders
*/
void main(){
	// Default alpha is 0
	float alpha = 0.0;

	// Radius is 0.5, since the diameter of our quad is 1
	float radius = 0.5;

	// Get the distance squared of from (0, 0)
	float dist_sq = v_Position.x*v_Position.x + v_Position.y*v_Position.y;

	// float bottom_left_x = radius * cos((3.1415926 / 180.0)*45) * -1;
	// float bottom_left_y = radius * sin((3.1415926 / 180.0)*45) * -1;
	float interp = 0.55;
	if(dist_sq < radius*radius){
		// Multiply by 4, since distance squared is at most 0.25
		// alpha = 1.0*dist_sq;

		float diff = v_Position.y + v_Position.x; // y - mx = 0 -> m = 1
		// if (diff < 0.0) {
		// 	gl_FragColor = vec4(circle_Color_Secondary); // BLUE
		// } else {
		// 	// vec4 m = mix(circle_Color, circle_Color_Secondary, 0.65);
		// 	gl_FragColor = vec4(circle_Color); // MAGENTA or YELLOW
		// }
		vec4 m = mix(circle_Color_Secondary*(1.0-diff), circle_Color*(diff), interp);
		gl_FragColor = vec4(m); // BLUE
		gl_FragColor.a = 0.85;
		// gl_FragColor.a = 1.0;
	}

	// Use the alpha value in our color
	// vec4 m = mix(circle_Color_Secondary, circle_Color, 0.3);
	// gl_FragColor = vec4(m);
	// // gl_FragColor.a = alpha;
	// gl_FragColor.a = 1.0;
}