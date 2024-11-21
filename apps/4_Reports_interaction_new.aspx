<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="4_Reports_interaction_new.aspx.vb" Inherits="ICC._4_Reports_interaction_new" %>

<%@ Register Assembly="DevExpress.Web.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web" TagPrefix="dx" %>
<%@ Register Assembly="DevExpress.Web.ASPxHtmlEditor.v20.1, Version=20.1.4.0, Culture=neutral, PublicKeyToken=b88d1754d700e49a" Namespace="DevExpress.Web.ASPxHtmlEditor" TagPrefix="dx" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="row" runat="server">
            <div class="col-xl-12 col-lg-12 col-12">
                <div class="box">
                    <div class="box-header with-border">
                        <h4 class="box-title">Report Interaction Ticket</h4>
                    </div>
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
                            <div class="col-sm-2" style="margin-top: 5px;">
                                <br />
                                <dx:ASPxButton ID="btn_Submit" runat="server" Theme="Metropolis" AutoPostBack="False" Text="Submit" ValidationGroup="SMLvalidationGroup"
                                    HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                </dx:ASPxButton>
                            </div>
                        </div>
                        <hr />
                        <dx:ASPxGridView ID="ASPxGridView1" runat="server" KeyFieldName="ID" Theme="MetropolisBlue"
                            Width="100%" DataSourceID="tempTrxInteraction" Styles-Header-Font-Bold="true" Font-Size="Small"
                            SettingsPager-PageSize="10">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="15, 20, 25" ShowAllItem="true" />
                            </SettingsPager>
                            <SettingsEditing Mode="Inline" />
                            <Settings ShowFilterRow="false" ShowFilterRowMenu="false"
                                ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" />
                            <SettingsBehavior ConfirmDelete="true" />
                            <Columns>
                                <dx:GridViewDataTextColumn Caption="ID" FieldName="ID" ReadOnly="true" Width="50px" Visible="false"
                                    PropertiesTextEdit-ReadOnlyStyle-BackColor="LightGray">
                                </dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Visible="false" Width="150px" GroupIndex="1" VisibleIndex="0"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Channel" FieldName="TicketSourceName" Width="100px" VisibleIndex="1"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Interaction ID" FieldName="GenesysID" Width="200px" VisibleIndex="2"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Thread ID" FieldName="ThreadID" Width="160px" VisibleIndex="3"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Agent Response" FieldName="ResponseComplaintNonHtml" Width="300px" VisibleIndex="4" PropertiesTextEdit-EncodeHtml="false"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Escalation To" FieldName="DispatchTicket" Width="160px" VisibleIndex="5"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Escalation To Layer" FieldName="DispatchToLayer" Width="160px" VisibleIndex="6"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Escalation To Dept" FieldName="ORGANIZATION_NAME" Width="160px" VisibleIndex="7"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Created by" FieldName="AgentCreateNew" Width="160px" VisibleIndex="8"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Status" FieldName="Status" Width="160px" VisibleIndex="9"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Type" FieldName="InteractionType" Width="160px" VisibleIndex="10"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Group Name" FieldName="AgentGroupName" Width="160px" VisibleIndex="10"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Site Name" FieldName="SiteName" Width="160px" VisibleIndex="10"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataDateColumn Caption="Date Create" FieldName="DateCreateConvert" Width="130px" VisibleIndex="11" PropertiesDateEdit-DisplayFormatString="yyyy-MM-dd hh:mm:ss"></dx:GridViewDataDateColumn>
                            </Columns>
                            <SettingsBehavior AutoExpandAllGroups="true" />
                            <Settings ShowGroupedColumns="True" />
                            <Settings ShowGroupPanel="True" />
                        </dx:ASPxGridView>
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
                            <hr />
                        </div>
                    </div>
                    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                    <asp:SqlDataSource ID="tempTrxInteraction" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
                    <div class="box-footer with-border">
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>

