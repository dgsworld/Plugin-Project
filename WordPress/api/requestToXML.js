// :: REQUESTING XML DATA
var array = [], opt = 0;

$(document).ready(function() {    
    $(function() {
        $.ajax({
            type: 'get',
            url: 'server/data.xml',
            dataType: 'xml',
            cache: false,
            success: function(xml) {
                $(xml).find('data').each(function() {
                    array.push({
                        name: $(this).find('name').text(),
                        price: $(this).find('price').text(),
                        package: $(this).find('package').text(),
                        description: $(this).find('description').text()
                    });
                });
            }
        });
    });
});

function requestXML() {
    var xml = '<?xml version="1.0" ?><offer>';
    for ( i=0; i<array.length; ++i ) {
        if (Math.floor((Math.random() * 10) + 1) > 6) 
            xml = xml + '<data><name>' + array[i]['name'] + '</name><price>' + array[i]['price'] + '</price><package>' + array[i]['package'] + '</package><description>' + array[i]['description'] + '</description></data>';
        } xml = xml + '</offer>';
        
    return xml;
}



// :: REQUESTING CUSTOMIZATION
function requestCustomization(name) {
    $(document).ready(function() {
        $.ajax({
            type: 'get',
            url: 'server/data.xml',
            dataType: 'xml',
            cache: false,
            success: function(xml) {
                $(xml).find('data').each(function() {
                    // :: If Name Matches The Offer!
                    if ( name == $(this).find('name').text() ) {
                        // :: Empty the Content of Customization!
                        $('#offerCustomization').html('');
                        
                        // :: If Internet Exists!
                        if ( $(this).find('custom').find('Internet').children().length > 0 ) {
                            $('#offerCustomization').append('<h3>Internet</h3>');
                            
                            // :: If Add-Ons Exists!
                            if ( $(this).find('custom').find('Internet').find('Add-Ons').children().length > 0 ) {
                                $('#offerCustomization').append('<h4>Add-Ons</h4>');
                                
                                // :: Print Each Add-Ons
                                $(this).find('custom').find('Internet').find('Add-Ons').find('category').each(function() {
                                    // :: If Subcategories Exist!
                                    if ( $(this).children().length > 0 ) {
                                        $('#offerCustomization').append('<h5>' + $(this).find('Title').text() + '</h5>');
                                        $('#offerCustomization').append('<form role="form">');
                                        
                                        // :: Traversing Subcategories!
                                        $(this).find('Subcategory').each(function() {
                                            $('#offerCustomization').append('<div class="radio">' + 
                                                                            '<label><input type="radio" name="opt' + opt + '"/>' + $(this).text() +
                                                                            '</label></div>');
                                        });
                                        
                                        ++opt;
                                        $('#offerCustomization').append('</form>');
                                    } else {
                                        $('#offerCustomization').append('<div class="checkbox">' +
                                                                        '<label><input type="checkbox" />' + $(this).text() +
                                                                        '</label></div>');
                                    }
                                });
                            }
                            
                            // :: If Devices Exists
                            if ( $(this).find('custom').find('Internet').find('Devices').children().length > 0 ) {
                                $('#offerCustomization').append('<h4>Devices</h4>');
                                
                                // :: Print Each Add-Ons
                                $(this).find('custom').find('Internet').find('Devices').find('category').each(function() {
                                    // :: If Subcategories Exist!
                                    if ( $(this).children().length > 0 ) {
                                        $('#offerCustomization').append('<h5>' + $(this).find('Title').text() + '</h5>');
                                        $('#offerCustomization').append('<form role="form">');
                                        
                                        // :: Traversing Subcategories!
                                        $(this).find('Subcategory').each(function() {
                                            $('#offerCustomization').append('<div class="radio">' + 
                                                                            '<label><input type="radio" name="opt' + opt + '"/>' + $(this).text() +
                                                                            '</label></div>');
                                        });
                                        
                                        ++opt;
                                        $('#offerCustomization').append('</form>');
                                    } else {
                                        $('#offerCustomization').append('<div class="checkbox">' +
                                                                        '<label><input type="checkbox" />' + $(this).text() +
                                                                        '</label></div>');
                                    }
                                });
                            }
                        }
                        
                        
                        // :: If Xfinity Home Exists!
                        if ( $(this).find('custom').find('XfinityHome').children().length > 0 ) {
                            $('#offerCustomization').append('<h3>Xfinity Home</h3>');
                            
                            // :: If Add-Ons Exists!
                            if ( $(this).find('custom').find('XfinityHome').find('Add-Ons').children().length > 0 ) {
                                $('#offerCustomization').append('<h4>Add-Ons</h4>');
                                
                                // :: Print Each Add-Ons
                                $(this).find('custom').find('XfinityHome').find('Add-Ons').find('category').each(function() {
                                    // :: If Subcategories Exist!
                                    if ( $(this).children().length > 0 ) {
                                        $('#offerCustomization').append('<h5>' + $(this).find('Title').text() + '</h5>');
                                        $('#offerCustomization').append('<form role="form">');
                                        
                                        // :: Traversing Subcategories!
                                        $(this).find('Subcategory').each(function() {
                                            $('#offerCustomization').append('<div class="radio">' + 
                                                                            '<label><input type="radio" name="opt' + opt + '"/>' + $(this).text() +
                                                                            '</label></div>');
                                        });
                                        
                                        ++opt;
                                        $('#offerCustomization').append('</form>');
                                    } else {
                                        $('#offerCustomization').append('<div class="checkbox">' +
                                                                        '<label><input type="checkbox" />' + $(this).text() +
                                                                        '</label></div>');
                                    }
                                });
                            }
                            
                            // :: If Devices Exists
                            if ( $(this).find('custom').find('XfinityHome').find('Devices').children().length > 0 ) {
                                $('#offerCustomization').append('<h4>Devices</h4>');
                                
                                // :: Print Each Add-Ons
                                $(this).find('custom').find('XfinityHome').find('Devices').find('category').each(function() {
                                    // :: If Subcategories Exist!
                                    if ( $(this).children().length > 0 ) {
                                        $('#offerCustomization').append('<h5>' + $(this).find('Title').text() + '</h5>');
                                        $('#offerCustomization').append('<form role="form">');
                                        
                                        // :: Traversing Subcategories!
                                        $(this).find('Subcategory').each(function() {
                                            $('#offerCustomization').append('<div class="radio">' + 
                                                                            '<label><input type="radio" name="opt' + opt + '"/>' + $(this).text() +
                                                                            '</label></div>');
                                        });
                                        
                                        ++opt;
                                        $('#offerCustomization').append('</form>');
                                    } else {
                                        $('#offerCustomization').append('<div class="checkbox">' +
                                                                        '<label><input type="checkbox" checked disabled/>' + $(this).text() +
                                                                        '</label></div>');
                                    }
                                });
                            }
                        }
                        
                        
                        // :: If Phone Exists
                        if ( $(this).find('custom').find('Phone').children().length > 0 ) {
                            $('#offerCustomization').append('<h3>Phone</h3>');
                            
                            // :: If Add-Ons Exists!
                            if ( $(this).find('custom').find('Phone').find('Add-Ons').children().length > 0 ) {
                                $('#offerCustomization').append('<h4>Add-Ons</h4>');
                                
                                // :: Print Each Add-Ons
                                $(this).find('custom').find('Phone').find('Add-Ons').find('category').each(function() {
                                    // :: If Subcategories Exist!
                                    if ( $(this).children().length > 0 ) {
                                        $('#offerCustomization').append('<h5>' + $(this).find('Title').text() + '</h5>');
                                        $('#offerCustomization').append('<form role="form">');
                                        
                                        // :: Traversing Subcategories!
                                        $(this).find('Subcategory').each(function() {
                                            $('#offerCustomization').append('<div class="radio">' + 
                                                                            '<label><input type="radio" name="opt' + opt + '"/>' + $(this).text() +
                                                                            '</label></div>');
                                        });
                                        
                                        ++opt;
                                        $('#offerCustomization').append('</form>');
                                    } else {
                                        $('#offerCustomization').append('<div class="checkbox">' +
                                                                        '<label><input type="checkbox" />' + $(this).text() +
                                                                        '</label></div>');
                                    }
                                });
                            }
                            
                            // :: If Devices Exists
                            if ( $(this).find('custom').find('Phone').find('Devices').children().length > 0 ) {
                                $('#offerCustomization').append('<h4>Devices</h4>');
                                
                                // :: Print Each Add-Ons
                                $(this).find('custom').find('Phone').find('Devices').find('category').each(function() {
                                    // :: If Subcategories Exist!
                                    if ( $(this).children().length > 0 ) {
                                        $('#offerCustomization').append('<h5>' + $(this).find('Title').text() + '</h5>');
                                        $('#offerCustomization').append('<form role="form">');
                                        
                                        // :: Traversing Subcategories!
                                        $(this).find('Subcategory').each(function() {
                                            $('#offerCustomization').append('<div class="radio">' + 
                                                                            '<label><input type="radio" name="opt' + opt + '"/>' + $(this).text() +
                                                                            '</label></div>');
                                        });
                                        
                                        ++opt;
                                        $('#offerCustomization').append('</form>');
                                    } else {
                                        $('#offerCustomization').append('<div class="checkbox">' +
                                                                        '<label><input type="checkbox" />' + $(this).text() +
                                                                        '</label></div>');
                                    }
                                });
                            }
                        }
                        
                        
                        // :: If Video Exists
                        if ( $(this).find('custom').find('Video').children().length > 0 ) {
                            $('#offerCustomization').append('<h3>Xfinity Home</h3>');
                            
                            // :: If Add-Ons Exists!
                            if ( $(this).find('custom').find('Video').find('Add-Ons').children().length > 0 ) {
                                $('#offerCustomization').append('<h4>Add-Ons</h4>');
                                
                                // :: Print Each Add-Ons
                                $(this).find('custom').find('Video').find('Add-Ons').find('category').each(function() {
                                    // :: If Subcategories Exist!
                                    if ( $(this).children().length > 0 ) {
                                        $('#offerCustomization').append('<h5>' + $(this).find('Title').text() + '</h5>');
                                        $('#offerCustomization').append('<form role="form">');
                                        
                                        // :: Traversing Subcategories!
                                        $(this).find('Subcategory').each(function() {
                                            $('#offerCustomization').append('<div class="radio">' + 
                                                                            '<label><input type="radio" name="opt' + opt + '"/>' + $(this).text() +
                                                                            '</label></div>');
                                        });
                                        
                                        ++opt;
                                        $('#offerCustomization').append('</form>');
                                    } else {
                                        $('#offerCustomization').append('<div class="checkbox">' +
                                                                        '<label><input type="checkbox" />' + $(this).text() +
                                                                        '</label></div>');
                                    }
                                });
                            }
                            
                            // :: If Devices Exists
                            if ( $(this).find('custom').find('Video').find('Devices').children().length > 0 ) {
                                $('#offerCustomization').append('<h4>Devices</h4>');
                                
                                // :: Print Each Add-Ons
                                $(this).find('custom').find('Video').find('Devices').find('category').each(function() {
                                    // :: If Subcategories Exist!
                                    if ( $(this).children().length > 0 ) {
                                        $('#offerCustomization').append('<h5>' + $(this).find('Title').text() + '</h5>');
                                        $('#offerCustomization').append('<form role="form">');
                                        
                                        // :: Traversing Subcategories!
                                        $(this).find('Subcategory').each(function() {
                                            $('#offerCustomization').append('<div class="radio">' + 
                                                                            '<label><input type="radio" name="opt' + opt + '"/>' + $(this).text() +
                                                                            '</label></div>');
                                        });
                                        
                                        ++opt;
                                        $('#offerCustomization').append('</form>');
                                    } else {
                                        $('#offerCustomization').append('<div class="checkbox">' +
                                                                        '<label><input type="checkbox" />' + $(this).text() +
                                                                        '</label></div>');
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
    });
}



// :: INSTALLATION API
var installation_array = ['Easy Installation | Onetime Charges: $15.99',
             'Standard Professional Installation | Onetime Charges: $99.99' ,
             'Express Professional Installation | Onetime Charges: $149.99',
             'Custom Installation | Onetime Charges: $179.99'];

function displayInstallation() {
    var tmpArray = [];
    for ( i=0; i<installation_array.length; ++i ) {
        if (Math.floor((Math.random() * 10) + 1) > 4) tmpArray.push(installation_array[i]);
    }
    
    if (tmpArray.length == 0) tmpArray.push(installation_array[1]);
    return tmpArray;
}

function printInstallationOffer(tmp) {
    $('#installation').html('');
    $('#installation').append('<div class="radioOptions">');
    for ( i=0; i<tmp.length; ++i ) {
        $('#installation').append('<div class="radio">' + 
                                      '<label><input type="radio" name="optionRadio">' + tmp[i] + '</label>' +
                                  '</div>');
    }
    $('#installation').append('</div>')
    
    $('.radio:first label input').attr('checked', true);
}