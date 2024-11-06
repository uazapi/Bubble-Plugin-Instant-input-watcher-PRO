function(instance, properties, context) {


    instance.data.reset();
    console.log('triggered')
    
    instance.publishState('pasted_file_base64', "")
    //instance.publishState('pasted_file', "")
    instance.publishState('pasted_file_type', "")
    //instance.publishState('videoImagePreview', "")
    instance.publishState('videoImagePreview64', "")
      


}