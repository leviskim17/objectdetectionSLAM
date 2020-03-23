/*
 * This file is part of ElasticFusion.
 *
 * Copyright (C) 2015 Imperial College London
 * 
 * The use of the code within this file and all code within files that 
 * make up the software that is ElasticFusion is permitted for 
 * non-commercial purposes only.  The full terms and conditions that 
 * apply to the code within this file are detailed within the LICENSE.txt 
 * file and at <http://www.imperial.ac.uk/dyson-robotics-lab/downloads/elastic-fusion/elastic-fusion-license/> 
 * unless explicitly stated.  By downloading this file you agree to 
 * comply with these terms.
 *
 * If you wish to use any of this code for commercial purposes then 
 * please email researchcontracts.engineering@imperial.ac.uk.
 *
 */

#version 330 core

in vec2 texcoord;

out float FragColor;

uniform sampler2D gSampler;
uniform float cols;
uniform float rows;
uniform float maxD;

void main()
{
    float value = float(texture(gSampler, texcoord.xy));
    
    if(value > maxD || value < 0.3)
    {
        FragColor = 0;
    }
    else
    {
	    int x = int(texcoord.x * cols);
	    int y = int(texcoord.y * rows);
	    
      const float sigma_space2_inv_half = 0.024691358; // 0.5 / (sigma_space * sigma_space)
      const float sigma_color2_inv_half = 555.556; // 0.5 / (sigma_color * sigma_color)
	        
	    const int R = 6;
	    const int D = R * 2 + 1;
	    
	    int tx = min(x - D / 2 + D, int(cols));
	    int ty = min(y - D / 2 + D, int(rows));
	
	    float sum1 = 0;
	    float sum2 = 0;
	    
	    for(int cy = max(y - D / 2, 0); cy < ty; ++cy)
	    {
	        for(int cx = max(x - D / 2, 0); cx < tx; ++cx)
	        {
	            float texX = float(cx) / cols;
	            float texY = float(cy) / rows;
	            
              float tmp = float(texture(gSampler, vec2(texX, texY)));
	            
	            float space2 = (float(x) - float(cx)) * (float(x) - float(cx)) + (float(y) - float(cy)) * (float(y) - float(cy));
	            float color2 = (float(value) - float(tmp)) * (float(value) - float(tmp));
	
	            float weight = exp(-(space2 * sigma_space2_inv_half + color2 * sigma_color2_inv_half));
	
	            sum1 += float(tmp) * weight;
	            sum2 += weight;
	        }
	    }
	
      FragColor = sum1/sum2;
    }
}
