<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_CreateCampaign_Grid.aspx.vb" Inherits="ICC._3_CreateCampaign_Grid" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/3_CreateCampaign_Grid.js"></script>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-full">
        <!-- Main content -->
		<section class="content">
            <div class="row">
              <div class="col-xl-12 col-lg-12 col-12">
					<div class="box">
						<div class="box-header with-border">						
							<h4 class="box-title">Create Campaigns</h4>
							
                            <br />
                            <asp:Label runat="server" Visible="false" ID="lblSql"></asp:Label>
						</div>
                        <div class="box-body">
                            <!-- Loader -->
                            <center><div class="spin2" id="LoaderPage"></div></center>
                            <!--End-->
                            <!-- Nav tabs -->
                             <div class="box-body p-15">		
                                <div class="row">
                                    <div class="col-md-3">
						                <div class="form-group">
						                  <label>Select Campaign Group - <a href="3_Channel_WA_List_Msg.aspx">Create Group Campaign</a></label>
						                  <select name="select" id="cmb_CampaignHeader" required class="form-control">
										    <option value="">Select</option>
										
									      </select>
						                </div>
                                    </div>
                                     <div class="col-md-3">
						                <div class="form-group">
						                  <label>Select Template Blast - <a href="3_Channel_WA_List_Msg.aspx">Create Template here</a></label>
						                  <select name="select" id="cmb_TemplateBlast" required class="form-control">
										    <option value="">Select</option>
										
									      </select>
						                </div>
                                    </div>
                                    
                                     <div class="col-md-3">
						               <div class="box-footer text-right">
						                    <a href="#" onclick="Blast_SaveData()" class="btn btn-rounded btn-success btn-outline">
						                      <i class="ti-save-alt"></i> Submit
						                    </a>
					                    </div>  
                                    </div>
                                   
                                </div>
                                 </div>
					    <ul class="nav nav-tabs customtab2" role="tablist">
						    <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#home7" role="tab"><span class="hidden-sm-up"><i class="ion-home"></i></span> <span class="hidden-xs-down">Blast Upload</span></a> </li>
						    <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#profile7" role="tab"><span class="hidden-sm-up"><i class="ion-person"></i></span> <span class="hidden-xs-down">Blast Table</span></a> </li>
						    
					    </ul>
					    <!-- Tab panes -->
					    <div class="tab-content">
                            <div class="tab-pane active" id="home7" role="tabpanel">
                            <div class="box-body p-15">		
                                Sample Template <a href="../FileBlast/sample.xlsx">Download here</a>
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
                            </div>
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
                                    <dx:GridViewDataTextColumn VisibleIndex="0" CellStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" FieldName="ID" ReadOnly="True">
                                        <EditFormSettings Visible="False" />
                                    </dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="GroupBlast" Caption="Group Campaigns" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="1"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="StatusBlast" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="2"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="NoWA" Caption="Phone Number" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="3"></dx:GridViewDataTextColumn>
                                
                                    <dx:GridViewDataMemoColumn FieldName="MsgBlast" Caption="Script Campaigns" VisibleIndex="4">
                                    </dx:GridViewDataMemoColumn>
                                    <dx:GridViewDataTextColumn FieldName="FileAttach" VisibleIndex="5">
                                    </dx:GridViewDataTextColumn>
                                
                                </Columns>

    <Styles>
    <Header Font-Bold="True"></Header>
    </Styles>
                            </dx:ASPxGridView>
                                <asp:SqlDataSource ID="dsWaBlast" runat="server" SelectCommand="SELECT [ID], [GroupBlast], [StatusBlast], [NoWA], [MsgBlast], [FileAttach] FROM [campaigns_data] WHERE ([TypeChannel] = @type) and StatusBlast='New'" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" DeleteCommand="DELETE FROM [campaigns_data] WHERE [ID] = @ID" InsertCommand="INSERT INTO [campaigns_data] ([GroupBlast], [StatusBlast], [NoWA], [MsgBlast], [FileAttach]) VALUES (@GroupBlast, @StatusBlast, @NoWA, @MsgBlast, @FileAttach)" UpdateCommand="UPDATE [campaigns_data] SET [GroupBlast] = @GroupBlast, [StatusBlast] = @StatusBlast, [NoWA] = @NoWA, [MsgBlast] = @MsgBlast, [FileAttach] = @FileAttach WHERE [ID] = @ID">
                                    <SelectParameters>
                                        <asp:QueryStringParameter Name="type" QueryStringField="type" Type="String" />
                                    </SelectParameters>
                                    <DeleteParameters>
                                        <asp:Parameter Name="ID" Type="Int32" />
                                    </DeleteParameters>
                                    <InsertParameters>
                                        <asp:Parameter Name="GroupBlast" Type="String" />
                                        <asp:Parameter Name="StatusBlast" Type="String" />
                                        <asp:Parameter Name="NoWA" Type="String" />
                                        <asp:Parameter Name="MsgBlast" Type="String" />
                                        <asp:Parameter Name="FileAttach" Type="String" />
                                    </InsertParameters>
                                    <UpdateParameters>
                                        <asp:Parameter Name="GroupBlast" Type="String" />
                                        <asp:Parameter Name="StatusBlast" Type="String" />
                                        <asp:Parameter Name="NoWA" Type="String" />
                                        <asp:Parameter Name="MsgBlast" Type="String" />
                                        <asp:Parameter Name="FileAttach" Type="String" />
                                        <asp:Parameter Name="ID" Type="Int32" />
                                    </UpdateParameters>
                                </asp:SqlDataSource>
						        <!--End-->
                            </div>
                            </div>
                            <div class="tab-pane" id="profile7" role="tabpanel">
							<div class="p-15">
								<p>Data yang terdapat disini yaitu data yang terdapat pada Menu List Phone</p>
                                <div class="box-footer text-right">
						                    <a href="#" onclick="Blast_GenerateData()" class="btn btn-rounded btn-success btn-outline">
						                      <i class="ti-save-alt"></i> Generate
						                    </a>
					                    </div>  
								<!-- New Template #RestuCode 2020-12-07 20:30 -->
                                <dx:ASPxGridView ID="gr_WaBlast_table" ClientInstanceName="gr_WaBlast_table" Width="100%" runat="server"
                                DataSourceID="dsWaBlast_table" KeyFieldName="ID"
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
	                                <dx:GridViewDataTextColumn VisibleIndex="1" CellStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" FieldName="ID" ReadOnly="True">
		                                <EditFormSettings Visible="False" />
	                                </dx:GridViewDataTextColumn>
	                                <dx:GridViewDataTextColumn FieldName="StatusBlast" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="2"></dx:GridViewDataTextColumn>
	                                <dx:GridViewDataTextColumn FieldName="NoWA" Caption="Phone Number" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="3"></dx:GridViewDataTextColumn>
	                                <dx:GridViewDataMemoColumn FieldName="MsgBlast" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="4"></dx:GridViewDataMemoColumn>
	                                <dx:GridViewDataTextColumn FieldName="FileAttach" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="5"></dx:GridViewDataTextColumn>
                                </Columns>
                                <Styles>
                                <Header Font-Bold="True"></Header>
                                </Styles>
                                </dx:ASPxGridView>
                                <asp:SqlDataSource ID="dsWaBlast_table" runat="server" SelectCommand="SELECT [ID], [StatusBlast], [NoWA], [MsgBlast], [FileAttach] FROM [campaigns_data] WHERE ([TypeChannel] = @type) and StatusBlast='New' " ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" DeleteCommand="DELETE FROM [campaigns_data] WHERE [ID] = @ID" InsertCommand="INSERT INTO [campaigns_data] ([StatusBlast], [NoWA], [MsgBlast], [FileAttach],[TypeChannel]) VALUES (@StatusBlast, @NoWA, @MsgBlast, @FileAttach, @type)" UpdateCommand="UPDATE [campaigns_data] SET [StatusBlast] = @StatusBlast, [NoWA] = @NoWA, [MsgBlast] = @MsgBlast, [FileAttach] = @FileAttach , [TypeChannel]=@Type WHERE [ID] = @ID">
	                                <SelectParameters>
                                        <asp:QueryStringParameter Name="type" QueryStringField="type" Type="String" />
                                    </SelectParameters>
                                    <DeleteParameters>
		                                <asp:Parameter Name="ID" Type="Int32" />
	                                </DeleteParameters>
	                                <InsertParameters>
		                                <asp:Parameter Name="StatusBlast" Type="String" />
		                                <asp:Parameter Name="NoWA" Type="String" />
		                                <asp:Parameter Name="MsgBlast" Type="String" />
		                                <asp:Parameter Name="FileAttach" Type="String" />
                                        <asp:QueryStringParameter Name="type" QueryStringField="type" Type="String" />
	                                </InsertParameters>
	                                <UpdateParameters>
		                                <asp:Parameter Name="StatusBlast" Type="String" />
		                                <asp:Parameter Name="NoWA" Type="String" />
		                                <asp:Parameter Name="MsgBlast" Type="String" />
		                                <asp:Parameter Name="FileAttach" Type="String" />
                                        <asp:QueryStringParameter Name="type" QueryStringField="type" Type="String" />
		                                <asp:Parameter Name="ID" Type="Int32" />
	                                </UpdateParameters>
                                </asp:SqlDataSource>
                                <!--End-->
							</div>
						</div>
					    </div>    
                    </div>
                   </div>
				</div>
          </div>
        </section>
		<!-- /.content -->
    </div>
    
</asp:Content>

