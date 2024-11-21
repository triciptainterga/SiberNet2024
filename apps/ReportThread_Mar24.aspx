<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="ReportThread_Mar24.aspx.vb" Inherits="ICC.ReportThread_Mar24" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="container-full">
        <br />
        <div class="content-header">
            <div class="d-flex align-items-center">
                <div class="w-p100 d-md-flex align-items-center justify-content-between">
                    <h3 class="page-title"></h3>
                    <div class="d-inline-block align-items-center">
                        <nav>
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item active" aria-current="page"><b>Report Thread Transaction</b></li>
                            </ol>
                        </nav>
                    </div>
                </div>

            </div>
        </div>
        <section class="content" style="margin-left: 10px; margin-right: 10px; margin-top: 10px;">
            <div class="row" runat="server">
                <div class="col-xl-12 col-lg-12 col-12">
                    <div class="box">
                        <div class="box-body p-15">
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
                                <%--  <div class="col-sm-2">
                                    <label>Channel</label>
                                    <dx:ASPxComboBox ID="CmbChannel" runat="server" CssClass="form-control input-sm" Width="100%" DataSourceID="SourceChannel"
                                        TextField="Name" ValueField="Name">
                                        <Columns>
                                            <dx:ListBoxColumn FieldName="Name" Caption="Channel"></dx:ListBoxColumn>
                                        </Columns>
                                        <ValidationSettings ErrorTextPosition="Bottom" ErrorDisplayMode="ImageWithText" ValidationGroup="SMLvalidationGroup">
                                            <RequiredField IsRequired="true" ErrorText="Must be filled" />
                                        </ValidationSettings>
                                    </dx:ASPxComboBox>
                                </div>--%>
                                <div class="col-sm-2" style="margin-top: 5px;">
                                    <br />
                                    <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                        HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                    </dx:ASPxButton>
                                </div>
                            </div>
                            <hr />
                            <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" runat="server" Width="100%"
                                DataSourceID="tempTrxThread" Styles-Header-Font-Bold="true" Font-Size="X-Small" Theme="MetropolisBlue"
                                Styles-Cell-HorizontalAlign="Center" Styles-Header-HorizontalAlign="Center">
                                <SettingsPager>
                                    <AllButton Text="All">
                                    </AllButton>
                                    <NextPageButton Text="Next &gt;">
                                    </NextPageButton>
                                    <PrevPageButton Text="&lt; Prev">
                                    </PrevPageButton>
                                    <PageSizeItemSettings Visible="true" Items="10, 15, 20" ShowAllItem="true" />
                                </SettingsPager>
                                <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" AutoFilterCondition="Contains" />
                                <Columns>
                                    <dx:GridViewDataTextColumn Caption="Channel" FieldName="ValueThread" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Interaction ID" FieldName="GenesysNumber" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Thread ID" FieldName="ThreadID" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="Thread Ticket" FieldName="ThreadTicket" Width="150px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Account" FieldName="Account" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="Account ID" FieldName="AccountContactID" Width="150px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Customer ID" FieldName="CustomerID" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Customer Name" FieldName="Name" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="CIF Number" FieldName="CIF" Width="150px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Agent Name" FieldName="AgentIDNew" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Group Name" FieldName="AgentGroupName" Width="200px"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="Site Name" FieldName="SiteName" Width="200px"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="Phone Chat" FieldName="PhoneChat" Width="150px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataTextColumn Caption="Subject" FieldName="Subject" Width="500px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <dx:GridViewDataTextColumn Caption="Type" FieldName="TypeData" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>
                                    <%--<dx:GridViewDataTextColumn Caption="Reason Type" FieldName="ThreadReasonNonHtml" Width="250px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>--%>
                                    <%--<dx:GridViewDataTextColumn Caption="Agent Group" FieldName="AgentGroupName" Width="150px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>--%>
                                    <%--<dx:GridViewDataTextColumn Caption="Site" FieldName="SiteName" Width="150px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>--%>
                                    <%--<dx:GridViewDataTextColumn Caption="Account Service" FieldName="WhatsAppNumber" Width="200px" Settings-AutoFilterCondition="Contains"></dx:GridViewDataTextColumn>--%>
                                    <%--<dx:GridViewDataTextColumn Caption="Amount" FieldName="Amount" Width="150px" Settings-AutoFilterCondition="Contains" PropertiesTextEdit-DisplayFormatString="{0:n2}"></dx:GridViewDataTextColumn>--%>
                                    <dx:GridViewDataDateColumn Caption="Date Create" FieldName="DateCreate" Width="250px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>
                                    <%--<dx:GridViewDataDateColumn Caption="Date Solving" FieldName="Datesolving" Width="250px" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd HH:mm:ss"></dx:GridViewDataDateColumn>--%>
                                </Columns>
                            </dx:ASPxGridView>
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
            <asp:SqlDataSource ID="tempTrxThread" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
            <asp:SqlDataSource ID="SourceChannel" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
        </section>
    </div>
</asp:Content>

