<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Channel_WA_Phone.aspx.vb" Inherits="ICC._3_Channel_WA_Phone" %>
<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
            $("#removeUpload").hide();
        });
        var countPage = 0;
        //IG Monitoring
        $('#files').change(function () {
            var filename = $('#files').val();
            if (filename.substring(3, 11) == 'fakepath') {
                filename = filename.substring(12);
            } // For Remove fakepath
            $("label[for='file_name'] b").html(filename);
            $("label[for='file_default']").text('Selected File: ');
            if (filename == "") {
                $("label[for='file_default']").text('No File Choosen');
            }
        });
        $(document).on("change", "input[name='files']", function (e) {
            $(".hiddenX").show();
            //var valnoWA = "628119970460";//$('#tglKejadian').val();
            var files = $(this).prop("files");
            var data = new FormData();

            var request;
            var result;
            var modal = $(this).closest(".modal");
            var itemid = modal.data("itemid");

            for (var i = 0; i < files.length; i++) {

                data.append("id", "617367367613876138");
                data.append("file", files[i]);
				data.append("Username", $("#hidusername").val());
				
                request = $.ajax({

                    type: "POST",
                    enctype: 'multipart/form-data',
                    url: "WebServiceTransaction.asmx/UploadFile",
                    data: data,
                    // dataType: "json",
                    contentType: false,
                    processData: false,

                });
                request.done(function (response) {
                    $(".hiddenX").hide();
                    $("#removeUpload").show();
                    // result = response.d;
                    $("#txtFileName").val($(response).find("Guid").text() + $(response).find("FileExt").text());
                    console.log("Success");
                    console.log($(response).find("Guid").text());
                    console.log($(response).find("FileExt").text());
                    //alert(result.NameNya);
                    location.reload();

                });

                request.fail(function (response) {

                    console.log(response.responseText);
                    //alert(response.responseText);

                });

                request.always(function () {

                    data.delete(itemid);
                    data.delete(files[i]);

                });

            }
        });
        $("#removeUpload").click(function () {
            $("#removeUpload").hide();
            $(".hiddenX").show();
            var jsonText = JSON.stringify({ fileName: $("#txtFileName").val() });
            //var valnoWA = "628119970460";//$('#tglKejadian').val();
            $.ajax({
                type: "POST",
                url: "Action/WebService.asmx/deleteFileUpload",
                contentType: "application/json; charset=utf-8",
                data: jsonText,
                dataType: "json",
                success: function (response) {
                    var json = JSON.parse(response.d);
                    //alert(json.ResultNya);
                }, complete: function () {
                    //back to normal!
                    $(".hiddenX").hide();
                    $("label[for='file_default']").text('No File Choosen');
                    $("label[for='file_name'] b").html('');
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(xhr.responseText);
                    alert(thrownError);
                }
            });

        });
    </script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-full">
        <!-- Main content -->
		<section class="content">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-12">
					<div class="box">
						<div class="box-header with-border">						
							<h4 class="box-title">List WA Account Customer</h4>
							<%--<h6 class="box-subtitle">List of blast WA to customer</h6>--%>
                            <br />
                            <asp:Label runat="server" Visible="false" ID="lblSql"></asp:Label>
						</div>

                        <%--<div class="box-body p-15">		
                        <div id="results"></div>
                                <label for="file_default">No File Choosen </label>
                                <label for="file_name"><b></b></label>
                                <a id="removeUpload" class="tb-btn tb-style1 tb-medium">Remove File</a>
                                <div class="tb-height-b60 tb-height-lg-b60"></div>
                                <section class="hk-sec-wrapper">
                                    <div class="row">
                                        <div class="col-sm-6">
                                            <input type="file" name="files" class="custom_file" id="files" />
                                        </div>
                                        <div class="col-sm-6">
                                            <input type="text" name="txtFileName" class="custom_file" id="txtFileName" style="width: 100%;" />
                                        </div>
                                    </div>
                                </section>
                        </div>--%>
						<div class="box-body p-15">		
                            <!-- New Template #RestuCode 2020-12-07 20:30 -->
							<dx:ASPxGridView ID="gr_WaBlast" ClientInstanceName="gr_WaBlast" Width="100%" runat="server"
                            DataSourceID="dsWaBlast" KeyFieldName="ID"
                            SettingsPager-PageSize="15" Theme="Office2010Black" Styles-Header-Font-Bold="true" Font-Size="X-Small" AutoGenerateColumns="False">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="25, 50, 75" ShowAllItem="true" />
                            </SettingsPager>
                            <SettingsEditing Mode="Inline" />
                            <Settings ShowGroupPanel="true" ShowHorizontalScrollBar="false" />
                            <SettingsBehavior ConfirmDelete="true" />
                                <SettingsSearchPanel Visible="True" />
                            <Columns>
                                <dx:GridViewCommandColumn ShowDeleteButton="True" ShowEditButton="True" ShowNewButtonInHeader="True" VisibleIndex="0">
                                </dx:GridViewCommandColumn>
                                <dx:GridViewDataTextColumn VisibleIndex="1" CellStyle-HorizontalAlign="left" HeaderStyle-HorizontalAlign="Center" FieldName="ID" ReadOnly="True">
                                    <EditFormSettings Visible="False" />
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="Nama"   HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" ReadOnly="false" VisibleIndex="2">
                                    
                                </dx:GridViewDataTextColumn>
                                
                                <dx:GridViewDataTextColumn FieldName="Telepon" VisibleIndex="3">
                                    <EditFormSettings Visible="True" />
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="Email" VisibleIndex="4">
                                    <EditFormSettings Visible="True" />
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="Provinsi" VisibleIndex="5">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="Kabupaten" VisibleIndex="6">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="PJBU" VisibleIndex="7">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="Random" VisibleIndex="8">
                                </dx:GridViewDataTextColumn>
                                
                            </Columns>
                            <SettingsEditing Mode="Batch" >
                                  <BatchEditSettings EditMode="Row" />
                             </SettingsEditing>
<Styles>
<Header Font-Bold="True"></Header>
</Styles>
                        </dx:ASPxGridView>
                            <asp:SqlDataSource ID="dsWaBlast" runat="server" SelectCommand="SELECT [ID], [Nama], [Telepon], [Email], [Provinsi], [Kabupaten], [PJBU], [Random] FROM [masterPhoneNumber]" ConnectionString="<%$ ConnectionStrings:WAConnection %>" DeleteCommand="DELETE FROM [masterPhoneNumber] WHERE [ID] = @ID" InsertCommand="INSERT INTO [masterPhoneNumber] ([Nama], [Telepon], [Email], [Provinsi], [Kabupaten], [PJBU], [Random]) VALUES (@Nama, @Telepon, @Email, @Provinsi, @Kabupaten, @PJBU, @Random)" UpdateCommand="UPDATE [masterPhoneNumber] SET [Nama] = @Nama, [Telepon] = @Telepon, [Email] = @Email, [Provinsi] = @Provinsi, [Kabupaten] = @Kabupaten, [PJBU] = @PJBU, [Random] = @Random WHERE [ID] = @ID">
                                <DeleteParameters>
                                    <asp:Parameter Name="ID" Type="Int32" />
                                </DeleteParameters>
                                <InsertParameters>
                                    <asp:Parameter Name="Nama" Type="String" />
                                    <asp:Parameter Name="Telepon" Type="String" />
                                    <asp:Parameter Name="Email" Type="String" />
                                    <asp:Parameter Name="Provinsi" Type="String" />
                                    <asp:Parameter Name="Kabupaten" Type="String" />
                                    <asp:Parameter Name="PJBU" Type="String" />
                                    <asp:Parameter Name="Random" Type="String" />
                                </InsertParameters>
                                <UpdateParameters>
                                    <asp:Parameter Name="Nama" Type="String" />
                                    <asp:Parameter Name="Telepon" Type="String" />
                                    <asp:Parameter Name="Email" Type="String" />
                                    <asp:Parameter Name="Provinsi" Type="String" />
                                    <asp:Parameter Name="Kabupaten" Type="String" />
                                    <asp:Parameter Name="PJBU" Type="String" />
                                    <asp:Parameter Name="Random" Type="String" />
                                    <asp:Parameter Name="ID" Type="Int32" />
                                </UpdateParameters>
                            </asp:SqlDataSource>
						    <!--End-->
                        </div>
					</div>
				</div>
          </div>
        </section>
		<!-- /.content -->
    </div>
    
</asp:Content>

