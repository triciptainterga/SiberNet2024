<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Qc_Trx.aspx.vb" Inherits="ICC.Qc_Trx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script>
        function comment() {
            $("#modal-center").modal('show');
        }
        function playMedia() {
            $("#modal-video").modal('show');
        }
    </script>
    <link href=”//vjs.zencdn.net/7.0/video-js.min.css” rel=”stylesheet”>
    <script src=”//vjs.zencdn.net/7.0/video.min.js”></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        
        <div class="row">
            <div class="col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Scorecard for <b>John Doe</b><img onclick="playMedia()" src="../Images/icon/play-icon.png" width="24"/></h4>
                        <div class="box-controls pull-right">
                            <div class="lookup lookup-circle lookup-right">
                                <input type="text" name="s">
                            </div>
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body no-padding">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <tbody>
                                    <tr class="bg-dark rounded p-50 mb-30">
                                        <th></th>
                                        <th style="width: 1000px; text-align: left;">Question</th>
                                        <th>Comment/Causes</th>
                                        <th style="text-align: left;">Answers</th>
                                        <th style="text-align: center;">Score</th>
                                    </tr>
                                    <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                        <td style="width: 50px;"></td>
                                        <td style="width: 1000px; font-weight: bold; font-style: italic; text-align: left;" colspan="5">Compliance adherence</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">1</td>
                                        <td style="width: 900px;">Account validation process was correctly complied with</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 200px;">
                                            <input name="group1" type="radio" id="radio_1" checked="">
                                            <label for="radio_1">Yes</label>
                                            <input name="group1" type="radio" id="radio_2">
                                            <label for="radio_2">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">2</td>
                                        <td style="width: 900px;">Properly completed product complaint process</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 200px;">
                                            <input name="group2" type="radio" id="radio1" checked="">
                                            <label for="radio1">Yes</label>
                                            <input name="group2" type="radio" id="radio2">
                                            <label for="radio2">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">3</td>
                                        <td style="width: 900px;">Followed GDPR</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 200px;">
                                            <input name="group3" type="radio" id="radio3" checked="">
                                            <label for="radio3">Yes</label>
                                            <input name="group3" type="radio" id="radio4">
                                            <label for="radio4">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">4</td>
                                        <td style="width: 900px;">Followed the complete internal process</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 200px;">
                                            <input name="group4" type="radio" id="radio5" checked="">
                                            <label for="radio5">Yes</label>
                                            <input name="group4" type="radio" id="radio6">
                                            <label for="radio6">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                        <td style="width: 50px;"></td>
                                        <td style="width: 800px; font-weight: bold; font-style: italic; text-align: left;" colspan="5">Issue Resolution</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">5</td>
                                        <td style="width: 600px;">Cancelation completed as requested</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 100px;">
                                            <input name="group5" type="radio" id="radio7" checked="">
                                            <label for="radio7">Yes</label>
                                            <input name="group5" type="radio" id="radio8">
                                            <label for="radio8">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">2</span></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">6</td>
                                        <td style="width: 600px;">Understood and correctly managed the query</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 100px;">
                                            <input name="group6" type="radio" id="radio9">
                                            <label for="radio9">Yes</label>
                                            <input name="group6" type="radio" id="radio10" checked="">
                                            <label for="radio10">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">0</span></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">7</td>
                                        <td>Correctly completted all system processes</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 100px;">
                                            <input name="group7" type="radio" id="radio11">
                                            <label for="radio11">Yes</label>
                                            <input name="group7" type="radio" id="radio12" checked="">
                                            <label for="radio12">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">0</span></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">8</td>
                                        <td>Issue properly escalated (when necessary)</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 100px;">
                                            <input name="group8" type="radio" id="radio13" checked="">
                                            <label for="radio13">Yes</label>
                                            <input name="group8" type="radio" id="radio14">
                                            <label for="radio14">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">1</span></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                        <td style="width: 50px;"></td>
                                        <td style="width: 800px; font-weight: bold; font-style: italic; text-align: left;" colspan="5">Soft Skill</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">9</td>
                                        <td style="width: 600px;">Demonstrated appropriate communication skills</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 100px;">
                                            <input name="group9" type="radio" id="radio15" checked="">
                                            <label for="radio15">Yes</label>
                                            <input name="group9" type="radio" id="radio16">
                                            <label for="radio16">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                        <td style="width: 50px;"></td>
                                        <td style="width: 800px; font-weight: bold; font-style: italic; text-align: left;" colspan="5">Call Management</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">10</td>
                                        <td style="width: 600px;">Handled customer interaction efficiently</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 100px;">
                                            <input name="group10" type="radio" id="radio23" checked="">
                                            <label for="radio23">Yes</label>
                                            <input name="group10" type="radio" id="radio24">
                                            <label for="radio24">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">2</span></td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">11</td>
                                        <td>Properly documented the interaction</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 100px;">
                                            <input name="group11" type="radio" id="radio25">
                                            <label for="radio25">Yes</label>
                                            <input name="group11" type="radio" id="radio26" checked="">
                                            <label for="radio26">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">0</span></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                        <td style="width: 50px;"></td>
                                        <td style="width: 800px; font-weight: bold; font-style: italic; text-align: left;" colspan="5">Business Intelligence</td>
                                    </tr>
                                    <tr>
                                        <td style="width: 50px;">12</td>
                                        <td style="width: 600px;">Could the interaction have been avoided?</td>
                                        <td style="width: 100px; text-align: center;"><a href="#" onclick="comment()"><i class="fa fa-plus"></i></a></td>
                                        <td style="width: 100px;">
                                            <input name="group12" type="radio" id="radio31" >
                                            <label for="radio31">Yes</label>
                                            <input name="group12" type="radio" id="radio32" checked="">
                                            <label for="radio32">No</label>
                                        </td>
                                        <td><span class="badge badge-pill badge-success" style="width: 100px;">0</span></td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr class="bg-warning-light text-center rounded p-50 b-1 mb-30">
                                        <td style="width: 50px; font-weight: bold; text-align: left; color: black;"></td>
                                        <td style="width: 700px; font-weight: bold; text-align: left; color: black;"><span class="badge badge-pill badge-danger" style="width: 100px;">Bellow Target</span></td>
                                        <td colspan="3" style="font-weight: bold; text-align: right; color: black;">Numeric&nbsp;<span class="badge badge-pill badge-default" style="width: 100px;"><b>25</b></span>&nbsp;&nbsp;Percentage&nbsp;<span class="badge badge-pill badge-default" style="width: 100px;"><b>83%</b></span></td>
                                        <%--<td style="width: 50px; font-weight: bold; color: black; text-align:right;">Percentage</td>--%>
                                        <%--<td><span class="badge badge-pill badge-default" style="width: 100px;"><b>83%</b></span></td>--%>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="box">
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div class="table-responsive">
                            <table class="table">
                                <tbody>
                                    <tr class="bg-dark rounded p-50 mb-30">
                                        <th scope="col" style="width: 1000px;">Section Last Month</th>
                                        <th scope="col" style="width: 50px;">Total</th>
                                        <th scope="col" style="width: 50px;">Percentage</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>Compliance adherence</td>
                                        <td style="width: 50px;">10</td>
                                        <td style="width: 30px;">80%</td>
                                    </tr>
                                    <tr>
                                        <td>Issue Resolution</td>
                                        <td style="width: 50px;">13</td>
                                        <td style="width: 30px;">56%</td>
                                    </tr>
                                    <tr>
                                        <td>Soft Skill</td>
                                        <td style="width: 50px;">2</td>
                                        <td style="width: 30px;">50%</td>
                                    </tr>
                                    <tr>
                                        <td>Call Management</td>
                                        <td style="width: 50px;">3</td>
                                        <td style="width: 30px;">75%</td>
                                    </tr>
                                    <tr>
                                        <td>Business Intelligence</td>
                                        <td style="width: 50px;">10</td>
                                        <td style="width: 30px;">20%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
            <div class="col-6">
                <div class="box">
                    <!-- /.box-header -->
                    <div class="box-body">
                        <div class="table-responsive">
                            <table class="table">
                                <tbody>
                                    <tr class="bg-dark rounded p-50 mb-30">
                                        <th scope="col" style="width: 1000px;">Section Now</th>
                                        <th scope="col" style="width: 50px;">Total</th>
                                        <th scope="col" style="width: 50px;">Percentage</th>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td>Compliance adherence</td>
                                        <td style="width: 50px;">16</td>
                                        <td style="width: 30px;">100% <i style="color:green;" class="mdi mdi-arrow-up-bold-circle font-size-14"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Issue Resolution</td>
                                        <td style="width: 50px;">3</td>
                                        <td style="width: 30px;">50% <i style="color:red;" class="mdi mdi-arrow-down-bold-circle font-size-14"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Soft Skill</td>
                                        <td style="width: 50px;">4</td>
                                        <td style="width: 30px;">100% <i style="color:green;" class="mdi mdi-arrow-up-bold-circle font-size-14"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Call Management</td>
                                        <td style="width: 50px;">2</td>
                                        <td style="width: 30px;">50%<i style="color:red;" class="mdi mdi-arrow-down-bold-circle font-size-14"></i></td>
                                    </tr>
                                    <tr>
                                        <td>Business Intelligence</td>
                                        <td style="width: 50px;">0</td>
                                        <td style="width: 30px;">0%<i style="color:red;" class="mdi mdi-arrow-down-bold-circle font-size-14"></i></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- /.box-body -->
                </div>
            </div>
        </div>
    </section>
    <div class="modal center-modal fade show" id="modal-center" tabindex="-1" aria-modal="true">
        <div class="modal-dialog">
            <div class="modal-content" style="width: 900px; margin-left: -200px;">
                <div class="modal-header">
                    <h5 class="modal-title">Create Remarks</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-12">
                                <%--<textarea style="height: 190px; width: 100%;"></textarea>--%>
                                <textarea rows="2" style="width: 100%;" ></textarea>
                            </div>
                        </div>
                        <div class="flexbox">
						    <div class="gap-items">
						      <span class="publisher-btn file-group">
							    <i class="fa fa-image file-browser"></i>
							    <input type="file">
						      </span>
						 
						      <a class="publisher-btn" href="#"><i class="fa fa-smile-o"></i></a>
						    </div>
					    </div>
                        <br />
                        <div class="row">
                            <div class="col-md-12">
                                <button type="button" class="btn btn-rounded btn-primary float-right">Save</button>
                            </div>
                        </div>
                        <hr />
                        <div class="media-list media-list-hover media-list-divided inner-user-div">
                            <div class="mailbox-read-info bb-0 clearfix">
                                <div class="float-left mr-5">
                                    <a href="#">
                                        <img src="../images/1.jpg" alt="user" width="40" class="rounded-circle"></a>
                                </div>
                                <h5 class="no-margin">Spv Samsu Rizal<br>
                                    <small>Jacob@domain.com</small>
                                    <span class="mailbox-read-time pull-right">22 JUL. 2018 08:03 PM</span></h5>
                            </div>
                            <!-- /.mailbox-read-info -->
                            <div class="mailbox-read-message">
                                <p>Seharusnya kamu bisa lebih santun lagi dalam memilih kata atau kalimat.</p>
                                
                            </div>
                           <%-- <hr />--%>
                            <div class="mailbox-read-info bb-0 clearfix">
                                <div class="float-left mr-5">
                                    <a href="#">
                                        <img src="../images/1.jpg" alt="user" width="40" class="rounded-circle"></a>
                                </div>
                                <h5 class="no-margin">Agent Malik<br>
                                    <small>Jacob@domain.com</small>
                                    <span class="mailbox-read-time pull-right">22 JUL. 2018 08:03 PM</span></h5>
                            </div>
                            <!-- /.mailbox-read-info -->
                            <div class="mailbox-read-message">
                                <p>Terimakasih masukannya pak, saya akan berusaha lebih baik lagi</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Media Player-->
    <div class="modal center-modal fade show" id="modal-video" tabindex="-1" aria-modal="true">
    <div class="modal-dialog">
    <div class="modal-content" style="width: 900px; margin-left: -200px;">
    <div class="modal-header">
	    <h5 class="modal-title">Agent Voice/Video Recording</h5>
	    <button type="button" class="close" data-dismiss="modal">
		    <span aria-hidden="true">×</span>
	    </button>
    </div>
    <div class="modal-body">
	    <div class="panel-body">
		    <div class="row">
			    <div class="col-12">
				    <div class="box">
					    <video
                            width="750px"
						     id="my-player"
						     class="video-js"
						     controls
						     preload="auto"
						     poster="//vjs.zencdn.net/v/oceans.png"
						     data-setup='{}'>
						     <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"/>
						     <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"/>
						     <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"/>
						     <p class="vjs-no-js">
						     To view this video please enable JavaScript, and consider upgrading to a web browser that
						     <a href="http://videojs.com/html5-video-support/" target="_blank">
						     supports HTML5 video
						     </a>
						     </p>
					    </video>
				    </div>
			    </div>
		    </div>
		
	  
	    </div>
    </div>
    </div>
    </div>
    </div>
    <!-- End -->
</asp:Content>
