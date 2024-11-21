<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="4_Reports_WA_Blast.aspx.vb" Inherits="ICC._4_Reports_WA_Blast" %>
<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>


<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>




<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-full">
		<!-- Content Header (Page header) -->
		<div class="content-header">
			<div class="d-flex align-items-center">
				<div class="w-p100 d-md-flex align-items-center justify-content-between">
					<h3 class="page-title">Reports WA Blast</h3>
					<div class="d-inline-block align-items-center">
						<nav>
							<ol class="breadcrumb">
								<li class="breadcrumb-item"><a href="#"><i class="mdi mdi-home-outline"></i></a></li>
								<li class="breadcrumb-item" aria-current="page">Page</li>
								<li class="breadcrumb-item active" aria-current="page">Report base on Staff</li>
							</ol>
						</nav>
					</div>
				</div>
				
			</div>
		</div>

    <!-- Main content -->
    <section class="content">
        
                <div class="row" runat="server" >
                    <div class="col-xl-12 col-lg-12 col-12">
					    <div class="box">
						    
						    <div class="box-body p-15">		
                                <!-- New Template #RestuCode 2020-12-07 20:30 -->
							    <div class="row" style="margin-bottom: -15px;">
                                <div class="col-sm-2">
                                    <label>Start Date</label>
                                    <dx:ASPxDateEdit ID="dt_strdate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                        </ValidationSettings>
                                    </dx:ASPxDateEdit>
                                </div>
                                <div class="col-sm-2">
                                    <label>End Date</label>
                                    <dx:ASPxDateEdit ID="dt_endate" runat="server" CssClass="form-control input-sm" Width="100%" EditFormatString="yyyy-MM-dd">
                                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                        </ValidationSettings>
                                    </dx:ASPxDateEdit>
                                </div>
                                <div class="col-sm-2" style="margin-top: 5px;">
                                    <br />
                                    <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                        HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                    </dx:ASPxButton>
                                </div>
                            </div>
                            <hr />
                                <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Width="100%" Theme="Office2010Black"
                                Font-Size="X-Small" Styles-Header-Font-Bold="true" AutoGenerateColumns="False" DataSourceID="SqlDataSource1">
                                <SettingsPager>
                                    <AllButton Text="All">
                                    </AllButton>
                                    <NextPageButton Text="Next &gt;">
                                    </NextPageButton>
                                    <PrevPageButton Text="&lt; Prev">
                                    </PrevPageButton>
                                    <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                                </SettingsPager>
                                <Settings ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" />
                                    <SettingsDataSecurity AllowDelete="False" AllowEdit="False" AllowInsert="False" />
                                    <SettingsSearchPanel Visible="True" />
                                <Columns>
                                    <dx:GridViewDataTextColumn FieldName="Nama" CellStyle-HorizontalAlign="Center"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="Provinsi"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="Kabupaten"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="PJBU"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="TemplateName"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="GroupBlast"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn FieldName="StatusBlast"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataDateColumn FieldName="DateSent" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss" VisibleIndex="7"></dx:GridViewDataDateColumn>
                                </Columns>

<Styles>
<Header Font-Bold="True"></Header>
</Styles>
                            </dx:ASPxGridView>
						        <!--End-->
                            </div>
					    </div>
				    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-sm-2">
                        <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                            <asp:ListItem Value="xlsx" Text="Excel" />
                            <asp:ListItem Value="xls" Text="Excel 97-2003" />
                            <asp:ListItem Value="pdf" Text="PDF" />
                            <asp:ListItem Value="rtf" Text="RTF" />
                            <asp:ListItem Value="csv" Text="CSV" />
                        </asp:DropDownList>
                    </div>
                    <div class="col-sm-2">
                        <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis" ValidationGroup="SMLvalidationGroup"
                            HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                        </dx:ASPxButton>
                    </div>
                </div>
                <hr />
                <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                <asp:SqlDataSource ID="SqlDataSource1" runat="server" ConnectionString="<%$ ConnectionStrings:WAConnection %>" SelectCommand="SELECT [Nama], [Provinsi], [Kabupaten], [PJBU], [TemplateName], [GroupBlast], [StatusBlast], [DateSent] FROM [WA_vw_Reports]"></asp:SqlDataSource>
    </section>
    <!-- /.content -->
    </div>
</asp:Content>


