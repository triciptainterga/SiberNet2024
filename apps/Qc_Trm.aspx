<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/apps/Uidesk.Master" CodeBehind="Qc_Trm.aspx.vb" Inherits="ICC.Qc_Trm" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <section class="content">
        <div class="box">
            <div class="box-header with-border">
                <h4 class="box-title">Data Master Quality Control</h4>
                <div class="box-controls pull-right">
                    <div class="lookup lookup-circle lookup-right">
                        <input type="text" name="s">
                    </div>
                </div>
            </div>
            <!-- /.box-header -->
            <div class="box-body no-padding">
                <div class="box-body">
                    <!-- Nav tabs -->
                    <ul class="nav nav-tabs nav-fill" role="tablist">
                        <li class="nav-item"><a class="nav-link active" data-toggle="tab" href="#home11" role="tab"><span><i class="ion-home"></i></span><span class="hidden-xs-down ml-15">Group Pertanyaan</span></a> </li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#profile11" role="tab"><span><i class="ion-person"></i></span><span class="hidden-xs-down ml-15">Pertanyaan</span></a> </li>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#messages11" role="tab"><span><i class="ion-email"></i></span><span class="hidden-xs-down ml-15">Detail Pertanyaan</span></a> </li>
                        <%--<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#setting11" role="tab"><span><i class="ion-settings"></i></span><span class="hidden-xs-down ml-15">Data Jawaban</span></a> </li>--%>
                        <%--<li class="nav-item"><a class="nav-link" data-toggle="tab" href="#about11" role="tab"><span><i class="ion-person"></i></span><span class="hidden-xs-down ml-15">Data Jawaban Benar</span></a> </li>--%>
                        <li class="nav-item"><a class="nav-link" data-toggle="tab" href="#contact11" role="tab"><span><i class="ion-settings"></i></span><span class="hidden-xs-down ml-15">Setting Bobot Jawaban</span></a> </li>
                    </ul>
                    <!-- Tab panes -->
                    <div class="tab-content tabcontent-border">
                        <div class="tab-pane active" id="home11" role="tabpanel">
                            <div class="p-15">
                                <table class="table table-hover">
                                    <tbody>
                                        <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                            <td style="width: 500px; font-weight: bold; font-style: italic; text-align: left;">Jenis Scorecard</td>
                                            <td style="width: 300px; font-weight: bold; font-style: italic; text-align: left;">Minimum Nilai</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 500px;">Compliance</td>
                                            <td style="width: 300px;">85%</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 500px;">Phone</td>
                                            <td style="width: 300px;">85%</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 500px;">Social Media</td>
                                            <td style="width: 300px;">80%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="profile11" role="tabpanel">
                            <div class="p-15">
                                <table class="table table-hover">
                                    <tbody>
                                        <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                            <td style="width: 150px; font-weight: bold; font-style: italic; text-align: left;">Jenis Scorecard</td>
                                            <td style="width: 800px; font-weight: bold; font-style: italic; text-align: left;">Pertanyaan</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 50px;">Compliance</td>
                                            <td style="width: 600px;">Compliance adherence</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 50px;">Compliance</td>
                                            <td style="width: 600px;">Issue Resolution</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 50px;">Compliance</td>
                                            <td style="width: 600px;">Soft Skill</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 50px;">Compliance</td>
                                            <td style="width: 600px;">Call Management</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 50px;">Compliance</td>
                                            <td style="width: 600px;">Business Intelligence</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="tab-pane" id="messages11" role="tabpanel">
                            <div class="p-15">
                                <table class="table table-hover">
                                    <tbody>
                                        <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                            <td style="width: 200px; font-weight: bold; font-style: italic; text-align: left;">Jenis Scorecard</td>
                                            <td style="width: 200px; font-weight: bold; font-style: italic; text-align: left;">Pertanyaan</td>
                                            <td style="width: 800px; font-weight: bold; font-style: italic; text-align: left;">Detail Pertanyaan</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Compliance adherence</td>
                                            <td style="width: 800px;">Account validation process was correctly complied with</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Compliance adherence</td>
                                            <td style="width: 800px;">Properly completed product complaint process</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Compliance adherence</td>
                                            <td style="width: 800px;">Followed GDPR</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Compliance adherence</td>
                                            <td style="width: 800px;">Followed the complete internal process</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Issue Resolution</td>
                                            <td style="width: 800px;">Cancelation completed as requested</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Issue Resolution</td>
                                            <td style="width: 800px;">Understood and correctly managed the query</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Issue Resolution</td>
                                            <td style="width: 800px;">Correctly completted all system processes</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Issue Resolution</td>
                                            <td style="width: 800px;">Issue properly escalated (when necessary)</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Soft Skill</td>
                                            <td style="width: 800px;">Demonstrated appropriate communication skills</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Call Management</td>
                                            <td style="width: 800px;">Handled customer interaction efficiently</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Call Management</td>
                                            <td style="width: 800px;">Properly documented the interaction</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Business Intelligence</td>
                                            <td style="width: 800px;">Could the interaction have been avoided?</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <%--     <div class="tab-pane" id="setting11" role="tabpanel">
                            <div class="p-15">
                                <h4>Fusce porta eros a nisl varius, non molestie metus mollis. Pellentesque tincidunt ante sit amet ornare lacinia.</h4>
                                <p>Duis cursus eros lorem, pretium ornare purus tincidunt eleifend. Etiam quis justo vitae erat faucibus pharetra. Morbi in ullamcorper diam. Morbi lacinia, sem vitae dignissim cursus, massa nibh semper magna, nec pellentesque lorem nisl quis ex.</p>
                                <h3>Donec vitae laoreet neque, id convallis ante.</h3>
                            </div>
                        </div>
                        <div class="tab-pane" id="about11" role="tabpanel">
                            <div class="p-15">
                                <p>Duis cursus eros lorem, pretium ornare purus tincidunt eleifend. Etiam quis justo vitae erat faucibus pharetra. Morbi in ullamcorper diam. Morbi lacinia, sem vitae dignissim cursus, massa nibh semper magna, nec pellentesque lorem nisl quis ex.</p>
                                <h3>Donec vitae laoreet neque, id convallis ante.</h3>
                                <h4>Fusce porta eros a nisl varius, non molestie metus mollis. Pellentesque tincidunt ante sit amet ornare lacinia.</h4>
                            </div>
                        </div>--%>
                        <div class="tab-pane" id="contact11" role="tabpanel">
                            <div class="p-15">
                                <table class="table table-hover">
                                    <tbody>
                                        <tr class="bg-lighter text-center rounded p-50 b-1 mb-30">
                                            <td style="width: 200px; font-weight: bold; font-style: italic; text-align: left;">Jenis Scorecard</td>
                                            <td style="width: 200px; font-weight: bold; font-style: italic; text-align: left;">Pertanyaan</td>
                                            <td style="width: 800px; font-weight: bold; font-style: italic; text-align: left;">Detail Pertanyaan</td>
                                            <td style="width: 100px; font-weight: bold; font-style: italic; text-align: left;">Bobot</td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Compliance adherence</td>
                                            <td style="width: 800px;">Account validation process was correctly complied with</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Compliance adherence</td>
                                            <td style="width: 800px;">Properly completed product complaint process</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Compliance adherence</td>
                                            <td style="width: 800px;">Followed GDPR</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Compliance adherence</td>
                                            <td style="width: 800px;">Followed the complete internal process</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Issue Resolution</td>
                                            <td style="width: 800px;">Cancelation completed as requested</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Issue Resolution</td>
                                            <td style="width: 800px;">Understood and correctly managed the query</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Issue Resolution</td>
                                            <td style="width: 800px;">Correctly completted all system processes</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Issue Resolution</td>
                                            <td style="width: 800px;">Issue properly escalated (when necessary)</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Soft Skill</td>
                                            <td style="width: 800px;">Demonstrated appropriate communication skills</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Call Management</td>
                                            <td style="width: 800px;">Handled customer interaction efficiently</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Call Management</td>
                                            <td style="width: 800px;">Properly documented the interaction</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                        <tr>
                                            <td style="width: 200px;">Compliance</td>
                                            <td style="width: 200px;">Business Intelligence</td>
                                            <td style="width: 800px;">Could the interaction have been avoided?</td>
                                            <td><span class="badge badge-pill badge-success" style="width: 100px;">4</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</asp:Content>
