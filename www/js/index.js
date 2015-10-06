var div_views=["uploadView","listObjectsView","createBucketView","deleteBucketView","deleteObjectView","readObjectView"];

var s3=null;

function login(){
    
    console.log("in login");
    
        var userId=$("#uid").val();
        var endPoint=$("#endPoint").val();
        var password=$("#password").val();

//    var userId="arpit";
//    var endPoint="http://10.4.0.101:9020";
//    var password="LjDQS6XoKt/xBX5qipeon1/LDPT+qBX2RBLg5RzM";
    
   // endPoint="https://"+endPoint;
   s3=new  AWS.S3({ endpoint:endPoint,accessKeyId: userId ,secretAccessKey: password, sslEnabled: false, s3ForcePathStyle: true});
    $("#unauthorised").hide()
    
    $("#unauthorised").empty();
    
    $("#config").hide();
    $( '#menu' ).show();
    var inputElement = document.getElementById("upload");
    inputElement.addEventListener("change", uploadFile, false);
    
//    s3.headBucket(params,function(err,data){
//                  if(err){
//                  if(err.statusCode==404){
//                  $("#unauthorised").hide()
//                  
//                  $("#unauthorised").empty();
//                  
//                  $("#config").hide();
//                  $( '#menu' ).show();
//                  var inputElement = document.getElementById("upload");
//                  inputElement.addEventListener("change", uploadFile, false);
//                  }else{
//                  $("#unauthorised").show();
//                  }
//                  
//                  }
//                  else{
//                  
//                  
//                  $("#unauthorised").hide()
//                  
//                  $("#unauthorised").empty();
//                  
//                  $("#config").hide();
//                  $( '#menu' ).show();
//                  var inputElement = document.getElementById("upload");
//                  inputElement.addEventListener("change", uploadFile, false);
//                  }
//                  });
    
}

function list(){
    $("#function").empty();
    $("#function").hide();
    $("#listObjectsOption").hide();
    $("#uploadFile").hide();
    s3.listBuckets(function(err,data){
                   var buckets=data.Buckets;
                   var content="<table border=1 >";
                   content=content+"<tr><td>BucketName</td></tr>"
                   for( var i=0;i<buckets.length;i++){
                   content+="<tr><td>"+buckets[i].Name+"</td></tr>";
                   }
                   content += "</table>";
                   $("#function").show();
                   $('#function').append(content);
                   
                   });
    
    
}


function showUpload(){
    
    
    $("#function").hide();
    $("#listObjectsOption").hide();
    $("#uploadFile").show();
    
}

function showListObjects(){
    
    
    $("#function").hide();
    $("#uploadFile").hide();
    $("#listObjectsOption").show();
    
}


function getView(id){
    $("#function").hide();
    $("#function").empty();
    
    
    var all_views=div_views;
    for(var i=0;i<all_views.length;i++){
        console.log(id+"View");
        console.log(all_views[i]);
        
        
        var divView=id+"View";
        
        var viewOnList=all_views[i];
        if(viewOnList.localeCompare(divView)==0){
            var view_id_to_show="#"+id+"View";
            $(view_id_to_show).show();
        }else{
            var view_id_to_hide="#"+all_views[i];
            $(view_id_to_hide).hide();
        }
    }
    
    
}


function uploadFile(fileslist){
    $("#function").empty();
    var file;
    var bucketName=$("#bucketName").val();
    for(var i=0;i<fileslist.length;i++){
        
        file=fileslist[i];
        console.log(fileslist[i]);
        console.log(fileslist[i].size);
        console.log(fileslist[i].lastModified);
        console.log(fileslist[i].lastModifiedDate);
    }
    
    console.log(file.name);
    $("#function").hide();
    var fileName=file.name;
    var bucketName=$("#bucketName").val();
    var key=fileName;
    var params={Bucket:bucketName,Key:key,Body:file};
    s3.putObject(params,function(err,data){
                 
                 
                 if(err==null){
                 content="<h1>Object Written Successfully</h1>";
                 }else{
                 contenct=err;
                 }
                 $("#function").show();
                 $('#function').append(content);
                 });
    
}


function listObjects(){
    $("#function").empty();
    
    var bucketName=$("#containerName").val();
    var splits=bucketName.split("/");
    
    var params={Bucket:bucketName};
    s3.listObjects(params,function(err,data){
                   if(err==null){
                   var content="<table border=1 >  <tr><td>Name</td><td>File Type</td><td>Size in Bytes</td><td>Last Modified</td></tr>";
                   var objectsList=data.Contents;
                   
                   for( var i=0;i<objectsList.length;i++){
                   content+="<tr><td>"+objectsList[i].Key+"</td><td> File </td><td>"+objectsList[i].Size+"</td><td>"+objectsList[i].LastModified+"</td></tr>";
                   }
                   content += "</table>";
                   
                   $("#function").show();
                   $('#function').append(content);
                   }
                   });
    
}




function createBucket(){
    
    $("#function").empty();
    
    var bucketName=$("#createContainerName").val();
    var create_params={Bucket:bucketName};
    s3.createBucket(create_params,function(err,data){
                    if(err==null){
                    content=content+"<h1>New Bucket with bucket name "+bucketName+ " Created</h1>";
                    }else{
                    content=err;
                    }
                    $("#function").show();
                    $('#function').append(content);
                    });
    
}


function deleteBucket(){
    $("#function").empty();
    var bucketName=$("#deleteBucketName").val();
    var create_params={Bucket:bucketName};
    s3.deleteBucket(create_params,function(err,data){
                    if(err==null){
                    content=content+"<h1>Bucket Deleted Successfully</h1>";
                    }else{
                    content=err;
                    }
                    $("#function").show();
                    $('#function').append(content);
                    });
    
    
}



function deleteObject(){
    
    $("#function").empty();
    
    var bucketName=$("#bucketObjectName").val();
    var objectName=$("#deleteObjectName").val();
    var create_params={Bucket:bucketName,Key:objectName};
    s3.deleteObject(create_params,function(err,data){
                    if(err==null){
                    content=content+"<h1>Object Deleted Successfully</h1>";
                    }else{
                    content=err;
                    }
                    $("#function").show();
                    $('#function').append(content);
                    });
    
    
}



function readObject(){
    $("#function").empty();
    
    
    var bucketName=$("#readBucketName").val();
    var objectName=$("#readObjectName").val();
    
//    var iframe = $('iframe#s3Iframe');
//    if (iframe.length == 0) {
//        iframe = $('<iframe id="s3Iframe'
//                   + '" style="display: none;" />');
//        $('body').append(iframe);
//    }
    var content=" Link is : <a href="+getShareableUrl(objectName,bucketName,futureDate(1, 'hours'),
                                              true)+">Click Here</a>"
    
    $("#function").show();
    $("#function").append(content);
    
//    iframe.prop('src', getShareableUrl(objectName,bucketName,futureDate(1, 'hours'),
//                                       true));
    
    
}

function getShareableUrl(id,bucketName,date,asAttachment){
    var expires = Math.floor( date.getTime() / 1000 );
    var params = {Bucket: bucketName, Key: id, Expires:expires};
    
    return s3.getSignedUrl('getObject',params);
}



function futureDate(howMany, ofWhat) {
    try {
        howMany = parseInt(howMany);
    } catch (error) {
        this.error(this.templates.get('invalidNumberError').render({
                                                                   value : howMany
                                                                   }));
        return null;
    }
    var date = new Date();
    var currentNumber = {
        hours : date.getHours(),
        days : date.getDate(),
        months : date.getMonth(),
        years : date.getFullYear()
    }[ofWhat.toLowerCase()];
    var func = {
        hours : date.setHours,
        days : date.setDate,
        months : date.setMonth,
        years : date.setFullYear
    }[ofWhat.toLowerCase()];
    func.call(date, currentNumber + howMany);
    return date;
};

