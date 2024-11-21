<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="3_Channel_WA_List_Msg.aspx.vb" Inherits="ICC._3_Channel_WA_List_Msg" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>--%>
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
							<h4 class="box-title">List Blast Template</h4>
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
                                    <dx:GridViewDataTextColumn FieldName="ID" ReadOnly="True" VisibleIndex="1">
                                        <EditFormSettings Visible="False" />
                                    </dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="UserCreate" VisibleIndex="2">
                                    </dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn FieldName="DateCreate" VisibleIndex="3">
                                    </dx:GridViewDataDateColumn>
                                    <dx:GridViewDataTextColumn FieldName="TemplateName" VisibleIndex="4">
                                    </dx:GridViewDataTextColumn>
                                    <dx:GridViewDataMemoColumn FieldName="MsgBlast" Width="350px" VisibleIndex="4">
                                    </dx:GridViewDataMemoColumn>
                                    <dx:GridViewDataTextColumn FieldName="UrlAttcach" Caption="Url Attachment" VisibleIndex="5">
                                    </dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="StatusMsg" VisibleIndex="6">
                                    </dx:GridViewDataTextColumn>
                                </Columns>

<Styles>
<Header Font-Bold="True"></Header>
</Styles>
                        </dx:ASPxGridView>
                            <asp:SqlDataSource ID="dsWaBlast" runat="server" SelectCommand="SELECT [ID], [UserCreate], [DateCreate], [TemplateName],[MsgBlast], [UrlAttcach], [StatusMsg] FROM [templateBlast]" ConnectionString="<%$ ConnectionStrings:WAConnection %>" DeleteCommand="DELETE FROM [templateBlast] WHERE [ID] = @ID" InsertCommand="INSERT INTO [templateBlast] ([UserCreate], [DateCreate], [TemplateName],[MsgBlast], [UrlAttcach], [StatusMsg]) VALUES (@UserCreate, @DateCreate, @TemplateName,@MsgBlast, @UrlAttcach, @StatusMsg)" UpdateCommand="UPDATE [templateBlast] SET [UserCreate] = @UserCreate, [DateCreate] = @DateCreate, [TemplateName]=@TemplateName,[MsgBlast] = @MsgBlast, [UrlAttcach] = @UrlAttcach, [StatusMsg] = @StatusMsg WHERE [ID] = @ID">
                                <DeleteParameters>
                                    <asp:Parameter Name="ID" Type="Int32" />
                                </DeleteParameters>
                                <InsertParameters>
                                    <asp:Parameter Name="UserCreate" Type="String" />
                                    <asp:Parameter Name="DateCreate" Type="DateTime" />
                                    <asp:Parameter Name="TemplateName" Type="String" />
                                    <asp:Parameter Name="MsgBlast" Type="String" />
                                    <asp:Parameter Name="UrlAttcach" Type="String" />
                                    <asp:Parameter Name="StatusMsg" Type="String" />
                                </InsertParameters>
                                <UpdateParameters>
                                    <asp:Parameter Name="UserCreate" Type="String" />
                                    <asp:Parameter Name="DateCreate" Type="DateTime" />
                                    <asp:Parameter Name="TemplateName" Type="String" />
                                    <asp:Parameter Name="MsgBlast" Type="String" />
                                    <asp:Parameter Name="UrlAttcach" Type="String" />
                                    <asp:Parameter Name="StatusMsg" Type="String" />
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
