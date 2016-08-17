$(document).ready(function() {
    var getOffer = 0, getXML = 0, count = 0, purchaseItemName = '', installationOption = [];
    
    // :: Hiding Modal Data
    $(function() {
        $('#offerCustomization').hide();
        $('#installation').hide();
        $('#yourInformation').hide();
        $('#reviewOrder').hide();
    });
    
    // :: Clicking Proceed in Offer Modal
    $('#proceed').click(function() {
        $('#backward').attr('disabled', false);
        
        // :: If Step 1 is Active!
        if ($('#step1').hasClass('actived') && count==0 ) alert('Add Offer in Cart Before Continuing');
        if ($('#step1').hasClass('actived') && count>0 ) {
            $('#step1').removeClass('actived');
            $('#step2').addClass('actived');
            
            // :: API Call for Customization
            requestCustomization(purchaseItemName);
            
            $('#findOffer').hide();
            $('#offerCustomization').show();
        } 
        // :: If Step 2 is Active
        else if ($('#step2').hasClass('actived')) {
            $('#step2').removeClass('actived');
            $('#step3').addClass('actived');
            
            $('#offerCustomization').hide();
            $('#installation').show();
            
            // :: API Calls!
            if ( getOffer == 0 ) {
                installationOption = displayInstallation();
                getOffer = -1;
            } printInstallationOffer(installationOption); 
        } 
        // :: If Step 3 is Active
        else if ($('#step3').hasClass('actived')) {
            $('#step3').removeClass('actived');
            $('#step4').addClass('actived');
            
            $('#installation').hide();
            $('#yourInformation').show();
        } 
        // :: If Step 4 is Active
        else if ($('#step4').hasClass('actived')) {
            $('#step4').removeClass('actived');
            $('#step5').addClass('actived');
            
            $('#yourInformation').hide();
            $('#reviewOrder').show();
        }
    });
    
    // :: @function#2
    // :: Clicking Back in Offer Modal
    $('#backward').click(function() {
        // :: If Step 2 is Active
        if ($('#step2').hasClass('actived')) {
            $('#step2').removeClass('actived');
            $('#step1').addClass('actived');
            
            $('#offerCustomization').hide();
            $('#findOffer').show();
            
            $('#backward').attr('disabled', true);
        } 
        // :: If Step 3 is Active
        else if ($('#step3').hasClass('actived')) {
            $('#step3').removeClass('actived');
            $('#step2').addClass('actived');
            
            $('#installation').hide();
            $('#offerCustomization').show();
        } 
        // :: If Step 4 is Active
        else if ($('#step4').hasClass('actived')) {
            $('#step4').removeClass('actived');
            $('#step3').addClass('actived');
            
            $('#yourInformation').hide();
            $('#installation').show();
        } 
        // :: If Step 5 is Active
        else if ($('#step5').hasClass('actived')) {
            $('#step5').removeClass('actived');
            $('#step4').addClass('actived');
            
            $('#reviewOrder').hide();
            $('#yourInformation').show();
        }
    });
    
    // :: If Get Started Clicked!
    $('#getStarted').click(function() {
        if ($('#step1').hasClass('actived')) {
            if ( getXML == 0 ) {
                // :: API Call
                xml = requestXML();
                xml = $.parseXML(xml);
                getXML = -1;
            }
            
            var j=1;
            $('#findOffer').html('');
            $('#findOffer').append('<div id="offerList">');
            $(xml).find('data').each(function() {
                $('#findOffer').append('<div class="offer">' +
                                       '<button type="button" class="btn btn-primary addToCart" id="offer' + j + '"><span class="glyphicon glyphicon-shopping-cart"></span> Add To Cart</button>' +
                                       '<h2 class="offerName" id="offer' + j + '">' + ($(this)).find('name').text() + '</h2>' +
                                       '<h3 class="offerPrice" id="offer' + j + '">' + ($(this)).find('price').text() + '</h3>' +
                                       '<h4 class="offerPackage" id="offer' + j + '">' + ($(this)).find('package').text() + '</h4>' + 
                                       '<p class="offerDescription" id=offer"' + j + '">' + ($(this)).find('description').text() + '</p>' +
                                       '</div>');
                ++j;
            });
            $('#findOffer').append('</div>');
            
            // :: If Add To Cart Clicked
            $('.addToCart').click(function() {
                if ( !($(this).hasClass('added')) && count == 0 ) {
                    var k = $(this).attr('id');
                    k = k.replace('offer', '');
                    $('#cartContent').append('<div class="cartItem" id="cart' + k + '">' +
                                             '<h5 class="cartItemName">' + $('h2#' + $(this).attr('id')).text()  + '</h5>' +
                                             '<h5 class="cartItemPrice">' + $('h3#' + $(this).attr('id')).text() + '</h5>');
                    
                    $(this).addClass('added');
                    ++count;
                    
                    purchaseItemName = $('h2#' + $(this).attr('id')).text();
                    var value = $('#totalCharge').text();
                    value = value.replace('Total Charges: $', '');
                    
                    var itemPrice = $('h3#' + $(this).attr('id')).text();
                    itemPrice = itemPrice.replace('$', '');
                    
                    $('#totalCharge').html('Total Charges: $' + (parseFloat(itemPrice)+parseFloat(value)).toFixed(2));
                } else alert('More Than 1 Item Can\'t Be Purchased');
                
                // :: If Remove Item is Clicked
                $('span.cartRemove').unbind('click').click(function() {
                    $('#' + $(this).attr('id')).remove();
                    var idNumber = $(this).attr('id');
                    idNumber = idNumber.replace('cart','');
                    $('button#offer' + idNumber).removeClass('added');
                    
                    purchaseItemName = '';
                    var value = $('#totalCharge').text();
                    value = value.replace('Total Charges: $', '');
                    
                    var itemPrice = $('h3#offer' + idNumber).text();
                    itemPrice = itemPrice.replace('$', '');
                    --count;
                    
                    $('#totalCharge').html('Total Charges: $' + (parseFloat(value)-parseFloat(itemPrice)).toFixed(2));
                });
            }); 
        }
    });
    
    
    // :: Clearing Cart
    $('#clearCart').click(function() {
        if ($('#step1').hasClass('actived')) {
            $('#totalCharge').html('Total Charges: $0.00');
            $('#cartContent').html('');
            count = 0;

            $('.offer button').each(function() {
                if ($(this).hasClass('added')) $(this).removeClass('added');
            });
        } else alert('You Can Only Clear Cart in Step 1 - Find Offers');
    });
});