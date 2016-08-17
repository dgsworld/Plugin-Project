<?php
/*
* Plugin Name: Bundle Deals Plugin
* Description: Display Comcast Bundle Deals Against Current Address
* Version: 1.0
* Author: Danyal Imran
* Author URI: http://facebook.com/fuNkyBRO1
* License: GPLv2
*/

    /* 
    LICENCE TERMS!
    
    Copyright 2016 Danyal Imran (email : k132089@nu.edu.pk)
    
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110-1301 USA
    */
    
    // :: Action Hook for Initializing a Widget
    add_action('widgets_init', 'bundle_deal_register_widget');

    // :: Creating bd_widget through WP_Widget Class
    function bundle_deal_register_widget() {
        register_widget('bd_widget');
    }

    // :: Extending bd_widget with WP_Widget
    class bd_widget extends WP_Widget {
        // :: Constructor
        function __construct() {
            $widgets_ops = array(
                'classname' => 'bd-widget-class',
                'description' => 'Display Bundle Deals Against Address Input'
            );
            
            parent::__construct('bd-widget', 'Bundle Deals Widget', $widgets_ops);
        }
        
        // :: Widget Initial Form Look
        function form($instance) {
            $defaults = array(
                'title' => 'Bundle Deals',
            );
            
            $instance = wp_parse_args((array)$instance, $defaults);
            
            $title = $instance['title']; ?>
            
            <p>Title: <input class="widefat" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" /></p>
            <?php
        }
         
        // :: Widget Form Values being Updated and Sanitized
        function update($new_instance, $old_instance) {
            $instance = $old_instance;
            $instance['title'] = sanitize_text_field($new_instance['title']);
            
            return $instance;
        }
        
        // :: Creating and Displaying Widget to WordPress Users
        function widget($args, $instance) {
            global $post;
            extract($args);
            ?>
            <!-- Google Maps JavaScript API Import -->
            <script src='http://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCdSBXej8PkDY0UsszAFEf5XlDx8jm4peE'></script>
            
            <!-- jQuery and Bootstrap CDN and JavaScript Imports -->
            <link rel='stylesheet' href='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' />
            <script src='https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js'></script>
            <script src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js'></script>
            <link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css">
            
            <!-- :: Custom CSS Import -->
            <link rel='stylesheet' href='wp-content/plugins/bundle-deal-plugin/css/plugin.css' />

            <!-- :: Widget Title and Google Maps -->
            <h3><?php echo $instance['title']; ?></h3> <br/>
            <div id='map-canvas'> </div> <br/>
            <script src='wp-content/plugins/bundle-deal-plugin/js/maps.js'></script>
            
            <!-- :: Form Input Fields -->
            <div id='form'>
                <p id='form-heading'><span class='glyphicon glyphicon-globe'></span> CHECK SERVICE AVAILABILITY</p>
                <div id='form-field'>
                    <input type='text' id='address' placeHolder='Enter your Location' />
                    <div id='form-sub-field'>
                        <input type='text' id='apartment' placeHolder='Apt' />
                        <input type='text' id='zipCode' placeHolder='Zip Code' disabled/>
                    </div>
                    <input type='email' id='email' placeHolder='abc@example.com' />

                    <div class="checkbox">
                        <label><input type='checkbox' id='existingCustomer' value=''>Existing Customer</label>
                    </div>
                    <div class="checkbox">
                        <label><input type='checkbox' id='moving' value=''>Moving?</label>
                    </div>

                    <button class='btn btn-primary' id='getStarted' data-toggle='modal' data-target='#offerModal'><span class='glyphicon glyphicon-check'></span> Get Started Now</button>
                </div>
            </div>
            
            <!-- :: Offer Modal -->
            <div id='offerModal' class='modal fade' role='dialog'>
                <div class='modal-dialog modal-lg'>
                    <div class='modal-content'>
                        <!-- :: Modal Header -->
                        <div class='modal-header'>
                            <button type='button' class='close' data-dismiss='modal'>&times;</button>
                            <!-- :: All of Modal Header Content -->
                            <div id='modalHeader' class='row'>
                                <!-- :: Step 1 Button -->
                                <div id='step1' class='col-md-2 actived'>
                                    <h4>Step 1</h4>
                                    <p>Find Offers</p>
                                </div>
                                
                                <!-- :: Step 1 Button -->
                                <div id='step2' class='col-md-2'>
                                    <h4>Step 2</h4>
                                    <p>Customization</p>
                                </div>
                                
                                <!-- :: Step 1 Button -->
                                <div id='step3' class='col-md-2'>
                                    <h4>Step 3</h4>
                                    <p>Installation</p>
                                </div>
                                
                                <!-- :: Step 1 Button -->
                                <div id='step4' class='col-md-2'>
                                    <h4>Step 4</h4>
                                    <p>Your Information</p>
                                </div>
                                
                                <!-- :: Step 1 Button -->
                                <div id='step5' class='col-md-2'>
                                    <h4>Step 5</h4>
                                    <p>Review Order</p>
                                </div>
                            </div>
                        </div>
                        
                        <!-- :: Modal Body -->
                        <div class='modal-body'>
                            <div class='row'>
                                <!-- :: Offer Content -->
                                <div class='col-md-8'>
                                    <!-- :: STEP 1 - FIND OFFERS -->
                                    <div id='findOffer'>
                                    </div>


                                    <!-- :: STEP 2 - OFFER CUSTOMIZATION -->
                                    <div id='offerCustomization'>
                                    </div>

                                    <!-- :: STEP 3 - INSTALLATION -->
                                    <div id='installation'>
                                    </div>

                                    <!-- :: STEP 4 - YOUR INFORMATION -->
                                    <div id='yourInformation'>
                                        <h2>Please Enter Your Details</h2>
                                        <input type='text' id='fname' placeholder='First Name' />
                                        <input type='text' id='lname' placeholder='Last Name' />
                                        <input type='tel' id='phoneNumber' placeholder='Phone Number' />
                                        <input type='email' id='email' placeholder='E-mail' />
                                        <input type='tel' id='SSN' placeholder='SSN' />
                                        <input type="text" onfocus="(this.type='date')" onblur="(this.type='text')" id='dob' placeholder='Date of Birth' />
                                        
                                        <div class='checkbox'>
                                            <label><input type='checkbox' value='authorizationCredit'> I Authorize a Credit Check</label>
                                        </div>
                                        
                                        <div class='checkbox'>
                                            <label><input type='checkbox' value='acceptTerms'> By checking this box, I expressly consent to being contacted by a representative of Digital Globe Services, Inc., TelSat Online, Inc., and/or other service providers, by email and phone, at the number provided above, including my wireless number if provided above, by automated technology. I understand that I am not required to provide consent as a condition of any sale of a good or service. Our privacy policy governs the collection of this info.</label>
                                        </div>
                                    </div>

                                    <!-- :: STEP 5 - REVIEW ORDER -->
                                    <div id='reviewOrder'>
                                        <h2>Review Order</h2>
                                        <input type='text' id='fname' placeholder='First Name' />
                                        <input type='text' id='lname' placeholder='Last Name' />
                                        <input type='tel' id='cardNumber' maxlength='16' placeholder='Card Number' />
                                        <input type='tel' id='cvv' maxlength='4' placeholder='CVV' />
                                    </div>
                                </div>
                                
                                <!-- :: Cart -->
                                <div class='col-md-4'>
                                    <div id='cart'>
                                        <!-- :: Cart Header -->
                                        <div id='cartHeader'>
                                            <h4><span class='glyphicon glyphicon-shopping-cart'></span> Your Cart</h4>
                                        </div>
                                        
                                        <!-- :: Cart Content -->
                                        <div id='cartContent'>
                                        </div>
                                        
                                        <!-- :: Cart Total -->
                                        <div id='cartTotal'>
                                            <p id='totalCharge'><b>Total Charges: </b>$0.00</p>
                                            <button type='button' class='btn btn-danger' id='clearCart'><span class='glyphicon glyphicon-trash'></span> Clear Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- :: Modal Footer -->
                        <div class='modal-footer'>
                            <button type='button' class='btn btn-warning' id='backward' disabled><span class='glyphicon glyphicon-backward'></span> Back</button>
                            <button type='button' class='btn btn-primary' id='proceed'><span class='glyphicon glyphicon-forward'></span> Proceed</button>
                            <button type='button' class='btn btn-danger' data-dismiss='modal'><span class='glyphicon glyphicon-remove'></span> Close</button>
                        </div>
                    </div>
                </div>
            </div>
            
            <script src='api/requestToXML.js'></script>
            <script src='wp-content/plugins/bundle-deal-plugin/jQuery/Ajax.js'></script>
            <script src='wp-content/plugins/bundle-deal-plugin/jQuery/jQuery.js'></script>
            <?php
        }
    }

?>