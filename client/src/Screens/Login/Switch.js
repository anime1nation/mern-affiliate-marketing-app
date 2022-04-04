import React from 'react';
import './switch.css';
import $ from 'jquery';

const Switch = () => {
    $(function() {

        $('.btn-link[aria-expanded="true"]').closest('.accordion-item').addClass('active');
      $('.collapse').on('show.bs.collapse', function () {
          $(this).closest('.accordion-item').addClass('active');
        });
    
      $('.collapse').on('hidden.bs.collapse', function () {
          $(this).closest('.accordion-item').removeClass('active');
        });
    
        
    
    });
    return(
        <div class="mb-4">
        <span class="text-muted small">Switch 1</span>
        <label class="custom-control teleport-switch">
          <span class="teleport-switch-control-description">Off</span>
          <input type="checkbox" class="teleport-switch-control-input" checked=""/>
          <span class="teleport-switch-control-indicator"></span>
          <span class="teleport-switch-control-description">On</span>
        </label>
      </div>

    );
}

export default Switch;