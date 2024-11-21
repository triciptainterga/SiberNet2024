<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="TrmMailRow.aspx.vb" Inherits="ICC.TrmMailRow" %>

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
                        <h4 class="box-title">Data Incoming Email&nbsp;</h4>
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
                        <dx:ASPxGridView ID="ASPxGridView1" ClientInstanceName="ASPxGridView1" DataSourceID="DSChannel" runat="server" Width="100%"
                            Font-Size="Small" Styles-Header-Font-Bold="true" Theme="MetropolisBlue" Styles-Cell-HorizontalAlign="Center" Styles-Header-HorizontalAlign="Center">
                            <SettingsPager>
                                <AllButton Text="All">
                                </AllButton>
                                <NextPageButton Text="Next &gt;">
                                </NextPageButton>
                                <PrevPageButton Text="&lt; Prev">
                                </PrevPageButton>
                                <PageSizeItemSettings Visible="true" Items="10, 25, 50, 100" ShowAllItem="true" />
                            </SettingsPager>
                            <Settings ShowFilterRow="true" ShowFilterRowMenu="false" ShowGroupPanel="true" ShowVerticalScrollBar="false" ShowHorizontalScrollBar="true" />
                            <Columns>
                                <dx:GridViewDataTextColumn Caption="ID" FieldName="IVC_ID" Width="50px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="From" FieldName="EFROM" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Subject" FieldName="ESUBJECT" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Body" FieldName="EBODY_TEXT" Width="450px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Agent" FieldName="agent" Width="250px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Ticket Number" FieldName="TicketNumber" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Email Date" FieldName="Email_Date" Width="150px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Read" FieldName="Reading" Width="100px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Handle" FieldName="FLAG_HANDLING" Width="100px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Handle Type" FieldName="DIRECTION" Width="100px"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Reply" FieldName="FLAGING_EMAIL_REPLY" Width="100px" PropertiesTextEdit-EncodeHtml="false"></dx:GridViewDataTextColumn>
                                <dx:GridViewDataTextColumn Caption="Kategori" FieldName="DIRECTION" Width="100px"></dx:GridViewDataTextColumn>
                            </Columns>
                        </dx:ASPxGridView>

                        <hr />
                        <div class="row">
                            <div class="col-sm-2">
                                <asp:DropDownList runat="server" ID="ddList" Height="30" CssClass="form-control input-sm">
                                    <asp:ListItem Value="xlsx" Text="Excel" />
                                    <asp:ListItem Value="xls" Text="Excel 97-2003" />
                                    <%--<asp:ListItem Value="pdf" Text="PDF" />
                                    <asp:ListItem Value="rtf" Text="RTF" />--%>
                                    <asp:ListItem Value="csv" Text="CSV" />
                                </asp:DropDownList>
                            </div>
                            <div class="col-sm-2">
                                <dx:ASPxButton ID="btn_Export" runat="server" Text="Export" Theme="Metropolis"
                                    HoverStyle-BackColor="#EE4D2D" Height="30px" Width="100%">
                                </dx:ASPxButton>
                            </div>
                        </div>
                        <hr />
                    </div>
                    <dx:ASPxGridViewExporter ID="ASPxGridViewExporter1" runat="server" GridViewID="ASPxGridView1"></dx:ASPxGridViewExporter>
                </div>
            </div>
        </div>
        <asp:SqlDataSource ID="DSChannel" ConnectionString="<%$ ConnectionStrings:DefaultConnection %>" runat="server"></asp:SqlDataSource>
    </section>
</asp:Content>
