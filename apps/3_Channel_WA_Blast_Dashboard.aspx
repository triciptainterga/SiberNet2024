<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Channel_WA_Blast_Dashboard.aspx.vb" Inherits="ICC._3_Channel_WA_Blast_Dashboard" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>

<%--<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>--%>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link rel="stylesheet" href="css/vendors_css.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/skin_color.css">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
    <script src="js/3_Channel_WA_Blast_Dashboard.js"></script>
    <script src="js/jquery-1.9.1.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <%--   <!-- Modal Edit Ticket Case-->
    <div class="modal modal-fill fade" data-backdrop="false" id="modal-fill" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <p><a href="https://3cx.uidesk.id:5001/webclient/#/call?phone=08119970461&autodial=true" target="_blank">Call Here</a></p>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-rounded btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-rounded btn-primary float-right">Save changes</button>
                </div>
            </div>
        </div>
    </div>--%>
    <!-- /.modal -->
    <div class="container-full">
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="d-flex align-items-center">
                <div class="w-p100 d-md-flex align-items-center justify-content-between">
                    <h3 class="page-title">WA dashboard</h3>
                    <div class="d-inline-block align-items-center">
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
                                <li class="breadcrumb-item" aria-current="page">Apps</li>
                                <li class="breadcrumb-item active" aria-current="page">Taskboard</li>
                            </ol>
                        </nav>
                    </div>
                </div>

            </div>
        </div>

        <!-- Main content -->
        <section class="content">

            <!-- /.col -->
            <%--<a onclick="postEmail_Notif()">Test Email</a>--%>
            <div class="row" id="2_TampungKotakAtas">
                <%--<div class="col-lg-3 col-6">
					  <a class="box box-link-shadow text-center" href="javascript:void(0)">
						<div class="box-body">
							<div class="font-size-24">+264</div>
							<span>Total Tickets</span>
						</div>
						<div class="box-body bg-info">
							<center>
								<span class="mdi mdi-ticket-confirmation font-size-30"></span>
							</center>
						</div>
					  </a>
				  </div>
				  <div class="col-lg-3 col-6">
					  <a class="box box-link-shadow text-center" href="javascript:void(0)">
						<div class="box-body">
							<div class="font-size-24">175</div>
							<span>Responded</span>
						</div>
						<div class="box-body bg-warning">
							<center>
								<span class="mdi mdi-message-reply-text font-size-30"></span>
							</center>
						</div>
					  </a>
				  </div>
				  <div class="col-lg-3 col-6">
					  <a class="box box-link-shadow text-center" href="javascript:void(0)">
						<div class="box-body">
							<div class="font-size-24">110</div>
							<span>Resolve</span>
						</div>
						<div class="box-body bg-success">
							<center>
								<span class="mdi mdi-thumb-up-outline font-size-30"></span>
							</center>
						</div>
					  </a>
				  </div>
				  <div class="col-lg-3 col-6">
					  <a class="box box-link-shadow text-center" href="javascript:void(0)">
						<div class="box-body">
							<div class="font-size-24">59</div>
							<span>Pending</span>
						</div>
						<div class="box-body bg-danger">
							<center>
								<span class="mdi mdi-ticket font-size-30"></span>
							</center>
						</div>
					  </a>
				  </div>--%>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="box">
                        <%--          <div class="box-header with-border">
                            <h4 class="box-title">Support Ticket List</h4>
                            <asp:Label runat="server" Visible="false" ID="lblSql"></asp:Label>
                        </div>--%>
                        <div class="box-body">
                            <div class="table-responsive">
                                <%--<table id="tickets" class="table mt-0 table-hover no-wrap table-borderless" data-page-size="10">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Ope. by</th>
                                            <th>Cust. Email</th>
                                            <th>Sbuject</th>
                                            <th>Status</th>
                                            <th>Ass. to</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1011</td>
                                            <td>
                                                <a href="javascript:void(0)">Sophia</a>
                                            </td>
                                            <td>sophia@gmail.com</td>
                                            <td>How to customize the template?</td>
                                            <td><span class="badge badge-warning">Pending</span> </td>
                                            <td>Elijah</td>
                                            <td>14-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1224</td>
                                            <td>
                                                <a href="javascript:void(0)">William</a>
                                            </td>
                                            <td>william@gmail.com</td>
                                            <td>How to change colors</td>
                                            <td><span class="badge badge-success">Complete</span> </td>
                                            <td>Benjamin</td>
                                            <td>13-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1024</td>
                                            <td>
                                                <a href="javascript:void(0)">Jayden</a>
                                            </td>
                                            <td>jayden@gmail.com</td>
                                            <td>How to set Horizontal nav</td>
                                            <td><span class="badge badge-success">Complete</span> </td>
                                            <td>Andrew</td>
                                            <td>13-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2124</td>
                                            <td>
                                                <a href="javascript:void(0)">Ethan</a>
                                            </td>
                                            <td>ethan@gmail.com</td>
                                            <td>How this will connect with ethan</td>
                                            <td><span class="badge badge-danger">Closed</span> </td>
                                            <td>Andrew</td>
                                            <td>12-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3124</td>
                                            <td>
                                                <a href="javascript:void(0)">Noah</a>
                                            </td>
                                            <td>noah@gmail.com</td>
                                            <td>How to set navigation</td>
                                            <td><span class="badge badge-success">Complete</span> </td>
                                            <td>Andrew</td>
                                            <td>12-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1611</td>
                                            <td>
                                                <a href="javascript:void(0)">Sophia</a>
                                            </td>
                                            <td>sophia@gmail.com</td>
                                            <td>How to customize the template?</td>
                                            <td><span class="badge badge-warning">Pending</span> </td>
                                            <td>Elijah</td>
                                            <td>14-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4224</td>
                                            <td>
                                                <a href="javascript:void(0)">William</a>
                                            </td>
                                            <td>william@gmail.com</td>
                                            <td>How to change colors</td>
                                            <td><span class="badge badge-success">Complete</span> </td>
                                            <td>Benjamin</td>
                                            <td>13-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2524</td>
                                            <td>
                                                <a href="javascript:void(0)">Jayden</a>
                                            </td>
                                            <td>jayden@gmail.com</td>
                                            <td>How to set Horizontal nav</td>
                                            <td><span class="badge badge-success">Complete</span> </td>
                                            <td>Andrew</td>
                                            <td>13-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>7524</td>
                                            <td>
                                                <a href="javascript:void(0)">Ethan</a>
                                            </td>
                                            <td>ethan@gmail.com</td>
                                            <td>How this will connect with ethan</td>
                                            <td><span class="badge badge-danger">Pending</span> </td>
                                            <td>Andrew</td>
                                            <td>12-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>4124</td>
                                            <td>
                                                <a href="javascript:void(0)">Noah</a>
                                            </td>
                                            <td>noah@gmail.com</td>
                                            <td>How to set navigation</td>
                                            <td><span class="badge badge-success">Complete</span> </td>
                                            <td>Andrew</td>
                                            <td>12-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1011</td>
                                            <td>
                                                <a href="javascript:void(0)">Mia</a>
                                            </td>
                                            <td>sophia@gmail.com</td>
                                            <td>How to customize the template?</td>
                                            <td><span class="badge badge-warning">Pending</span> </td>
                                            <td>Elijah</td>
                                            <td>14-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>1224</td>
                                            <td>
                                                <a href="javascript:void(0)">Chloe</a>
                                            </td>
                                            <td>william@gmail.com</td>
                                            <td>How to change colors</td>
                                            <td><span class="badge badge-success">Complete</span> </td>
                                            <td>Benjamin</td>
                                            <td>13-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>8024</td>
                                            <td>
                                                <a href="javascript:void(0)">Chloe</a>
                                            </td>
                                            <td>jayden@gmail.com</td>
                                            <td>How to set Horizontal nav</td>
                                            <td><span class="badge badge-success">Complete</span> </td>
                                            <td>Andrew</td>
                                            <td>13-10-2018</td>
                                            <td>
                                                <a href="javascript:void(0)" class="text-danger" data-toggle="tooltip" data-original-title="Delete"><i class="ti-comment-alt" aria-hidden="true"></i></a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>--%>
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
                                <dx:GridViewDataTextColumn VisibleIndex="1" CellStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center" FieldName="ID" ReadOnly="True">
                                    <EditFormSettings Visible="False" />
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="StatusBlast" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="2"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn FieldName="NoWA" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="3"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataMemoColumn FieldName="MsgBlast" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="4"></dx:GridViewDataMemoColumn>
                                <dx:GridViewDataTextColumn FieldName="FileAttach" HeaderStyle-HorizontalAlign="left" Settings-AutoFilterCondition="Contains" VisibleIndex="5"></dx:GridViewDataTextColumn>
                                
                            </Columns>

<Styles>
<Header Font-Bold="True"></Header>
</Styles>
                        </dx:ASPxGridView>
                            <asp:SqlDataSource ID="dsWaBlast" runat="server" SelectCommand="SELECT [ID], [StatusBlast], [NoWA], [MsgBlast], [FileAttach] FROM [wablast_archive]" ConnectionString="<%$ ConnectionStrings:WAConnection %>" DeleteCommand="DELETE FROM [wablast_archive] WHERE [ID] = @ID" InsertCommand="INSERT INTO [wablast_archive] ([StatusBlast], [NoWA], [MsgBlast], [FileAttach]) VALUES (@StatusBlast, @NoWA, @MsgBlast, @FileAttach)" UpdateCommand="UPDATE [wablast_archive] SET [StatusBlast] = @StatusBlast, [NoWA] = @NoWA, [MsgBlast] = @MsgBlast, [FileAttach] = @FileAttach WHERE [ID] = @ID">
                                <DeleteParameters>
                                    <asp:Parameter Name="ID" Type="Int32" />
                                </DeleteParameters>
                                <InsertParameters>
                                    <asp:Parameter Name="StatusBlast" Type="String" />
                                    <asp:Parameter Name="NoWA" Type="String" />
                                    <asp:Parameter Name="MsgBlast" Type="String" />
                                    <asp:Parameter Name="FileAttach" Type="String" />
                                </InsertParameters>
                                <UpdateParameters>
                                    <asp:Parameter Name="StatusBlast" Type="String" />
                                    <asp:Parameter Name="NoWA" Type="String" />
                                    <asp:Parameter Name="MsgBlast" Type="String" />
                                    <asp:Parameter Name="FileAttach" Type="String" />
                                    <asp:Parameter Name="ID" Type="Int32" />
                                </UpdateParameters>
                            </asp:SqlDataSource>
                            </div>
                        </div>
                        <%-- <dx:ASPxGridView ID="gr_Todolist" ClientInstanceName="gr_Todolist" Width="100%" runat="server"
                                DataSourceID="dsTodolist" KeyFieldName="NumberRow"
                                SettingsPager-PageSize="15" Theme="Office2010Black" Styles-Header-Font-Bold="true" Font-Size="X-Small" Visible="true">
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
                                <Settings ShowFilterRow="true" ShowGroupPanel="true" ShowHorizontalScrollBar="false" />
                                <SettingsBehavior ConfirmDelete="true" />
                                <Columns>
                                    <dx:GridViewDataTextColumn Caption="Action" VisibleIndex="0" CellStyle-HorizontalAlign="Center" HeaderStyle-HorizontalAlign="Center">
                                        <DataItemTemplate>
                                            <a href="#" data-toggle="modal" data-target="#modal-fill"><i class="mdi mdi-table-edit" style="font-size: 16px;"></i></a>
                                        </DataItemTemplate>
                                    </dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Status" FieldName="Status" HeaderStyle-HorizontalAlign="left" Width="60px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Ticket On Layer" FieldName="TicketPosition" HeaderStyle-HorizontalAlign="left" Width="100px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" HeaderStyle-HorizontalAlign="left" Width="130px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Customer Name" FieldName="NamePIC" HeaderStyle-HorizontalAlign="left" Width="250px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Description Complaint" FieldName="DetailComplaint" HeaderStyle-HorizontalAlign="left" Width="250px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="From Name" FieldName="NAMA_PELAPOR" HeaderStyle-HorizontalAlign="left" Width="100px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="From Phone" FieldName="PHONE_PELAPOR" HeaderStyle-HorizontalAlign="left" Width="100px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="SLA" FieldName="SLA" HeaderStyle-HorizontalAlign="left" Width="100px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Description SLA" FieldName="UsedDaySLAOK" HeaderStyle-HorizontalAlign="left" Width="100px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Unit Kerja" FieldName="UnitKerjaNya" HeaderStyle-HorizontalAlign="left" Width="100px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                </Columns>
                            </dx:ASPxGridView>
                        <asp:SqlDataSource ID="dsTodolist" runat="server" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>"></asp:SqlDataSource>--%>
                    </div>
                </div>
            </div>
            <!-- /.row -->

        </section>
        <!-- /.content -->
    </div>
</asp:Content>

