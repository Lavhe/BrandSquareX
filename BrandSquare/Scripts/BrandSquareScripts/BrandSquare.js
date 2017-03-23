/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/materialize.d.ts" />
/// <reference path="typings/vue.d.ts" />
function LogOut(BrandName) {
    $.ajax({
        url: '/Brand/' + BrandName + '/LogOut',
        success: function (answer) {
            if (answer == "done") {
                window.location.reload();
            }
        }
    });
}
var LoggedInBrand = null;
var xImageModals = 0;
var Brand = (function () {
    function Brand(ID, Name, Logo) {
        this.ID = ID;
        this.Name = Name;
        this.Logo = Logo;
    }
    return Brand;
}());
var PostCard = (function () {
    function PostCard() {
    }
    return PostCard;
}());
Vue.component('x-upcoming-events', {
    template: "\n                <div>\n                    <div v-for=\"post in Posts\">\n                       <x-eventcard :post-card=\"post\"></x-eventcard>\n                    </div>\n                    <x-loading v-if=\"LoadingPosts\"></x-loading>\n                </div>\n            ",
    data: function () {
        return {
            Posts: new Array(),
            LoadingPosts: false
        };
    }, mounted: function () {
        var self = this;
        self.LoadingPosts = true;
        $.ajax({
            url: '/event/getUpComing',
            success: function (answer) {
                if (answer[0] == "No More Posts") {
                    console.log("No More events Posts");
                }
                else {
                    var posts = JSON.parse(answer);
                    for (var i = 0; i < posts.length; i++) {
                        console.log(posts[i]);
                        self.Posts.push({ post: posts[i], Type: true });
                    }
                }
                self.LoadingPosts = false;
            }
        });
    }
});
Vue.component('x-eventcard', {
    template: "\n     <div>\n<div class=\"card-wrapper\" role=\"button\">\n            <div class=\"card-rotating effect__click\" v-bind:class=\"{'flipped':Flipped}\" id=\"card-i\">\n                <div class=\"face front\">\n                    <div class=\"card\">\n                        <div class=\"card-title\">\n                            <div class=\"Post_Header row\">\n                                <div class=\"Post_Header_Img col-xs-1 text-xs-left left\">\n                                    <x-image-modal \n                                                                          v-bind:img-src=\"post.PosterImage\"></x-image-modal>\n                                </div>\n                                <div class=\"Post_Header_Left col-xs-9 row\">\n                                    <div class=\"col-xs-12 text-xs-left\">\n                                        <h4 class=\"h4-responsive\"><a :href=\"'/brand/' + post.PosterName\">{{ post.PosterName }}</a></h4>\n                                    </div>\n                                    <div class=\"col-xs-12 text-xs-left\">\n                                        <span><a>{{ post.PosterCategory }}</a></span> <i class=\"fa fa-dot-circle-o\"></i> {{ post.PostCategory }}\n                                    </div>\n                                </div>\n                                <div class=\"Post_Header_Right col-xs-2 text-xs-right right\">\n                                    <div class=\"tag tag-danger\">R{{ post.PostPrice }}</div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"card-block text-xs-center\">\n                            <div class=\"view overlay hm-white-slight text-xs-center flex-center\">\n                                <h2 class=\"text-xs-center h2-responsive\">\n                                    {{ post.PostName }}\n                                </h2>\n                                <a>\n                                    <div class=\"mask\"></div>\n                                </a>\n                            </div>\n                        </div>\n\n                        <div class=\"card-share\">\n                            <div class=\"social-reveal\">\n                                <a type=\"button\" class=\"btn-floating btn-fb\"><i class=\"fa fa-facebook\"></i></a>\n                                <a type=\"button\" class=\"btn-floating btn-tw\"><i class=\"fa fa-twitter\"></i></a>\n                                <a type=\"button\" class=\"btn-floating btn-gplus\"><i class=\"fa fa-instagram\"></i></a>\n                            </div>\n                            <a class=\"btn-floating btn-action share-toggle white\"><i class=\"fa fa-share-alt black-text\"></i></a>\n                        </div>\n\n                        <div class=\"card-link row Post_Footer\">\n                            <div class=\"col-xs-3\">\n                                <a class=\"left btn btn-floating btn-small waves-effect waves-circle transparent activator\"><i class=\"fa fa-phone green-text animated tada infinite\"></i></a>\n                            </div>\n                            <div class=\"col-xs-6 text-xs-center\">\n                                <a v-bind:class=\"{'left btn btn-info-outline btn-sm waves-effect rotate-btn':true}\" v-on:click=\"Flipped=true\" data-card=\"card-i\">Line Up</a>\n                            </div>\n                            <div class=\"col-xs-3\">\n                                <br />\n                                <span class=\"center text-xs-center small comment-date Post_Body_Date\">{{ post.PostDate }}</span>\n                            </div>\n                        </div>\n\n                        <div class=\"card-reveal\">\n                            <div class=\"content text-xs-center\">\n                                <h6 class=\"card-title\">Contact US<i class=\"fa fa-close\"></i></h6>\n                                <hr>\n                                <ul class=\"list-group\">\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"face back\">\n                    <h6><i class=\"fa fa-map-marker\"></i> {{post.PostVenue}}  <a class=\"rotate-btn right text-xs-right\" v-on:click=\"Flipped=false\" data-card=\"card-i\"><i class=\"fa fa-close\"></i></a></h6>\n                    <hr>\n                    <ul class=\"list-group\" style=\"height:80%;overflow-y:scroll\" v-for=\"lineUp in post.PostLineup\">\n                        <li class=\"list-group-item\">{{ lineUp }}</li>\n                    </ul>\n                </div>\n            </div>\n        </div>\n     <div>",
    props: ['postCard'],
    data: function () {
        return {
            Flipped: false
        };
    },
    mounted: function () {
        $(window).resize();
    },
    computed: {
        post: {
            get: function () {
                return this.postCard.post;
            },
            set: function (val) {
                this.postCard = val;
            },
        },
    }
});
Vue.component('x-salescard', {
    template: "<div>\n        <div class=\"card narrower\">\n            <div class=\"card-title\">\n                <div class=\"Post_Header row\">\n                    <div class=\"Post_Header_Img col-xs-1 text-xs-left left\">\n                        <x-image-modal \n                                      v-bind:img-src=\"post.PosterImage\"></x-image-modal>\n                    </div>\n                    <div class=\"Post_Header_Left col-xs-9 row\">\n                        <div class=\"col-xs-12 text-xs-left\">\n                            <h4 class=\"h4-responsive\"><a :href=\"'/brand/' + post.PosterName\">{{ post.PosterName }}</a></h4>\n                        </div>\n                        <div class=\"col-xs-12 text-xs-left\">\n                            <span><a>{{ post.PosterCategory }}</a></span> <i class=\"fa fa-dot-circle-o\"></i> {{ post.PostCategory }}\n                        </div>\n                    </div>\n                    <div class=\"Post_Header_Right col-xs-2 pull-right\">\n                        <div class=\"tag tag-danger\">NEW</div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"view hm-zoom hm-white-strong overlay text-xs-center flex-center waves-effect\">\n                <img v-bind:src=\"post.PostImage\" style=\"width:100%;height:100%\" class=\"img-fluid \" alt=\"\">\n                <div class=\"mask flex-center\">\n                    <p class=\"black-text\">{{post.PostName}}</p>\n                </div>\n            </div>\n            <div class=\"card-share\">\n                <div class=\"social-reveal\">\n                    <a type=\"button\" class=\"btn-floating btn-fb\"><i class=\"fa fa-facebook\"></i></a>\n                    <a type=\"button\" class=\"btn-floating btn-tw\"><i class=\"fa fa-twitter\"></i></a>\n                    <a type=\"button\" class=\"btn-floating btn-gplus\"><i class=\"fa fa-instagram\"></i></a>\n                </div>\n                <a class=\"btn-floating btn-action share-toggle white\"><i class=\"fa fa-share-alt black-text\"></i></a>\n            </div>\n            <div class=\"card-link row Post_Footer\">\n                <div class=\"col-xs-3\">\n                    <a class=\"btn btn-floating btn-small waves-effect waves-circle transparent activator\"><i class=\"fa fa-phone green-text animated tada infinite\"></i></a>\n                </div>\n                <div class=\"col-xs-6 center text-xs-center animated pulse infinite\">\n                    <span class=\"center tag tag-danger\">\n                        {{post.PostPrice}}\n                    </span>\n                </div>\n            </div>\n            <div class=\"card-reveal\">\n                <div class=\"content text-xs-center\">\n                    <h4 class=\"card-title\">Social shares <i class=\"fa fa-close\"></i></h4>\n                    <hr>\n                </div>\n            </div>\n         </div>\n    </div>",
    props: ['postCard'],
    mounted: function () {
    },
    computed: {
        post: {
            get: function () {
                return this.postCard.post;
            },
            set: function (val) {
                this.postCard = val;
            },
        },
    }
});
function Initialize() {
    $('.mdb-select').material_select();
    $('.datepicker').pickadate({});
}
Vue.component('x-login', {
    template: "<div class=\"modal fade modal-ext\" id=\"modal-login\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">&times;</span>\n                        </button>\n                        <h3><i class=\"fa fa-lock\"></i> Login</h3>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div v-if=\"!LoginBrandNameFound\">\n                            <div class=\"md-form\">\n                                <i class=\"fa fa-user prefix\"></i>\n                                <input type=\"text\" id=\"LoginBrandname\" v-model=\"LoginBrandname\" v-on:keyup.enter=\"SubmitLoginBrandName\" class=\"form-control\" v-bind:class=\"{'invalid':LogInFailed}\">\n                                <label for=\"LoginBrandname\">Brand Name</label>\n                            </div>\n                            <div class=\"md-form\">\n                                <span class=\"red-text text-xs-center\">{{LogInFailedText}}</span>\n                            </div>\n                            <div class=\"text-xs-center\">\n                                <x-loading v-if=\"LoadingLoginBrandName\"></x-loading>\n                                <button v-if=\"!LoadingLoginBrandName\" class=\"btn btn-primary btn-lg\" v-bind:class=\"{'animated shake':LogInFailed}\" v-on:click=\"SubmitLoginBrandName\">Next</button>\n                            </div>\n\n                            <div class=\"modal-footer\">\n                                <div class=\"options\">\n                                    <p>Not a member? <a href=\"#\">Sign Up</a></p>\n                                </div>\n                            </div>\n                        </div>\n                        <div v-if=\"LoginBrandNameFound\">\n                            <section class=\"section team-section\">\n                                <div class=\"row\">\n                                    <span class=\"text-xs-right right\" role=\"button\" v-on:click=\"LoginBrandNameFound = false\">\n                                        Switch Account\n                                    </span>\n                                    <div class=\"col-md-6 offset-md-3 col-xs-12 m-b-r text-xs-center\">\n                                        <div class=\"avatar\">\n                                            <img v-bind:src=\"LoginBrandlogo\" class=\"img-circle\">\n                                        </div>\n                                        <h4>{{LoginBrandname}}</h4>\n                                        <div class=\"md-form\">\n                                            <input type=\"password\" v-model=\"LogIn_Password\" placeholder=\"Password...\" v-on:keyup.enter=\"SubmitLogin\" v-bind:class=\"{'invalid':LogInFailed}\" class=\"form-control text-xs-center\">\n                                        </div>\n                                        <div class=\"md-form\">\n                                            <span class=\"red-text text-xs-center\">{{LogInFailedText}}</span>\n                                        </div>\n                                        <div class=\"text-xs-center\">\n                                              <x-loading v-if=\"LoadingLoginBrandPassword\"></x-loading>                                                 \n                                              <button v-if=\"!LoadingLoginBrandPassword\" class=\"btn btn-primary btn-lg\" v-bind:class=\"{'animated shake':LogInFailed}\" v-on:click=\"SubmitLogin\">Login</button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </section>\n                            <div class=\"modal-footer\">\n                                <div class=\"options row\">\n                                    <span class=\"text-xs-left\">\n                                        Forgot <a class=\"waves-effect\" href=\"#\">Password?</a>\n                                    </span>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        ",
    data: function () {
        return {
            LogInFailed: false,
            LogIn_Password: '',
            LogInFailedText: '',
            LoadingLoginBrandName: false,
            LoadingLoginBrandPassword: false
        };
    },
    props: ['LoginBrandNameFound', 'LoginBrandname', 'LoginBrandlogo'],
    methods: {
        SubmitLoginBrandName: function () {
            var _this = this;
            this.LoadingLoginBrandName = true;
            this.LogInFailed = false;
            this.LogInFailedText = this.LoadingDiv;
            if (this.LoginBrandname.length < 3) {
                this.LogInFailedText = "BrandName too short";
                this.LogInFailed = true;
                this.LoadingLoginBrandName = true;
            }
            else {
                $.ajax({
                    method: 'POST',
                    url: "/Brand/" + this.LoginBrandname + "/FindBrand",
                    success: function (answer) {
                        if (answer.indexOf("Error") >= 0) {
                            _this.LogInFailedText = answer;
                            _this.LogInFailed = true;
                        }
                        else {
                            var brand = JSON.parse(answer);
                            _this.LoginBrandname = brand.Name;
                            _this.LoginBrandlogo = brand.Logo;
                            _this.LoginBrandNameFound = true;
                            _this.LogInFailedText = '';
                            _this.LogInFailed = false;
                        }
                        _this.LoadingLoginBrandName = false;
                    }
                });
            }
        },
        SubmitLogin: function () {
            var _this = this;
            this.LoadingLoginBrandPassword = true;
            this.LogInFailedText = '';
            this.LogInFailed = false;
            if (this.LogIn_Password.length < 3) {
                this.LoadingLoginBrandPassword = false;
                this.LogInFailedText = "BrandPassword too short";
                this.LogInFailed = true;
            }
            else {
                $.ajax({
                    method: 'POST',
                    url: "/Brand/" + this.LoginBrandname + "/Login?password=" + this.LogIn_Password,
                    success: function (answer) {
                        if (answer != "Done") {
                            _this.LogInFailedText = answer;
                            _this.LogInFailed = true;
                            _this.LoadingLoginBrandPassword = false;
                        }
                        else {
                            window.location.href = "/Brand/" + _this.LoginBrandname;
                        }
                    }
                });
            }
        }
    }
});
Vue.component('x-posts', {
    template: "\n          <div>\n             <div class=\"row\">\n                 <div class=\"col-xs-12\">\n                    <ul class=\"nav nav-tabs md-pills pills-success PostTypeChooser\">\n                        <li class=\"nav-item\">\n                            <a class=\"nav-link\" v-on:click=\"showType('all')\" v-bind:class=\"{'active':showSales && showEvents}\">all</a>\n                        </li>\n                        <li class=\"nav-item\">\n                            <a class=\"nav-link\" v-on:click=\"showType('sales')\" v-bind:class=\"{'active':showSales && !showEvents}\" role=\"tab\">sales</a>\n                        </li>\n                        <li class=\"nav-item\">\n                            <a class=\"nav-link\" v-on:click=\"showType('events')\" v-bind:class=\"{'active':!showSales && showEvents}\"  role=\"tab\">events</a>\n                        </li>\n                    </ul>\n                </div>\n             </div>\n             <div class=\"row\" v-for=\"post in Posts\">\n                <div v-if=\"post.Type && showEvents\" class=\"col-xs-12 col-md-10 offset-md-1\">\n                    <x-eventcard :post-card=\"post\"></x-eventcard>\n                </div>\n                <div v-if=\"!post.Type && showSales\" class=\"col-xs-12 col-md-10 offset-md-1\">\n                    <x-salescard :post-card=\"post\"></x-salescard>\n                </div>\n            </div> \n            <x-loading v-if=\"LoadingPosts\"></x-loading>\n         </div> ",
    data: function () {
        return {
            LoadingPosts: false,
            BrandID: '',
            Posts: new Array(),
            EventPostIndex: 0,
            SalesPostIndex: 0,
            showSales: true,
            showEvents: true
        };
    },
    mounted: function () {
        this.getPosts(this.postBrand, this.postType);
        $(window).scroll();
    },
    props: ['postBrand', 'postType'],
    methods: {
        showType: function (value) {
            $(window).scroll();
            if (value == 'sales') {
                this.showSales = true;
                this.showEvents = false;
            }
            else if (value == 'events') {
                this.showSales = false;
                this.showEvents = true;
            }
            else {
                this.showSales = true;
                this.showEvents = true;
            }
        },
        getPosts: function (brandID, type) {
            if (brandID === void 0) { brandID = 0; }
            if (type === void 0) { type = "all"; }
            var self = this;
            var eventIN = false;
            var saleIN = false;
            var rand = 0;
            $(window).scroll(function (e) {
                if ($(e.currentTarget).scrollTop() + $(window).height() >= ($(document).height() - $('#FooterX').height() - 200)) {
                    rand = Math.floor((Math.random() * 2) + 1);
                    self.LoadingPosts = true;
                    if (rand === 1) {
                        if (!eventIN) {
                            eventIN = true;
                            $.ajax({
                                url: '/event/getpost?brandID=' + brandID + '&index=' + self.EventPostIndex,
                                success: function (answer) {
                                    if (answer == "No More Posts") {
                                        console.log("No More events Posts");
                                    }
                                    else {
                                        var result = JSON.parse(answer);
                                        self.Posts.push({ post: result, Type: true });
                                        self.EventPostIndex++;
                                    }
                                    eventIN = false;
                                    self.LoadingPosts = false;
                                }
                            });
                        }
                    }
                    else {
                        if (!saleIN) {
                            saleIN = true;
                            $.ajax({
                                url: '/sale/getpost?brandID=' + brandID + '&index=' + self.SalesPostIndex,
                                success: function (answer) {
                                    if (answer == "No More Posts") {
                                        console.log("No More sales Posts");
                                    }
                                    else {
                                        var result = JSON.parse(answer);
                                        self.Posts.push({ post: result, Type: false });
                                        self.SalesPostIndex++;
                                    }
                                    saleIN = false;
                                    self.LoadingPosts = false;
                                }
                            });
                        }
                    }
                }
            });
        }
    }
});
Vue.component('x-image-modal', {
    template: "\n                <div class=\"xImageModal\">\n                    <div class=\"waves-effect hm-white-strong view hm-zoom overlay\" data-toggle=\"modal\" v-bind:data-target=\"'#' +imgId\" style=\"border-radius:50%\">\n                        <img v-bind:src.once=\"imgSrc\" class=\"\" style=\"width:100%;height:100%\" />\n                        <p class=\"mask flex-center\">\n                            <i class=\"fa fa-eye black-text fa-2x\"></i>\n                        </p>\n                    </div>\n                    <div class=\"modal fade transparent fullSize\" v-bind:id=\"imgId\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myLargeModalLabel\" aria-hidden=\"true\">\n                        <div class=\"modal-dialog modal-lg transparent fullSize\">\n                            <div class=\"modal-content transparent fullSize\">\n                                <div class=\"modal-header\">\n                                    <button type=\"button\" class=\"close red-text\" data-dismiss=\"modal\" aria-label=\"Close\">\n                                        <span aria-hidden=\"true\">&times;</span>\n                                    </button>\n                                </div>\n                                <div class=\"modal-body\">\n                                    <img v-bind:src.once=\"imgSrc\" class=\"img-fluid\" style=\"width:100%;height:100%\" />\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>",
    methods: {
        DisplayImage: function () {
        }
    }, mounted: function () {
    }, data: function () {
        return {
            imgId: xImageModals++
        };
    },
    props: ['imgSrc']
});
Vue.component('x-loading', {
    template: "<div>\n                    <div class=\"loadingDivFather\">\n                        <div class=\"loading loadingDiv\">\n                            <div class=\"bullet\">L</div>\n                            <div class=\"bullet\">o</div>\n                            <div class=\"bullet\">a</div>\n                            <div class=\"bullet\">d</div>\n                            <div class=\"bullet\">i</div>\n                            <div class=\"bullet\">n</div>\n                            <div class=\"bullet\">g</div>\n                        </div>\n                    </div>\n              </div>"
});
Vue.component('x-addSales', {
    template: "\n            <div>\n            <div class=\"row card animated rotateInDownRight\">\n                <div class=\"col-xs-12 row\">\n                    <div class=\"col-md-6\">\n                        <div class=\"image-editor row depth-z-0 center text-xs-center\">\n                                <div class=\"file-field text-xs-center col-md-6 offset-md-3\">\n                                    <div role=\"button\" class=\"btn btn-primary center text-xs-center btn-sm waves-effect\">\n                                        <span>Select Image to Upload</span>\n                                        <input type=\"file\" accept=\"image/*\" v-on:click=\"AttachCropIt\" class=\"cropit-image-input\" />\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"md-form form-group\">\n                                <textarea class=\"md-textarea\" v-model=\"Sales_Description\" v-bind:class=\"{'invalid':SalesDescriptionError,'valid':!SalesDescriptionError}\" length=\"20\"></textarea>\n                        </div>\n                        <hr />\n                        <div class=\"md-form input-group\">\n                            <span class=\"input-group-addon\">R</span>\n                            <input type=\"number\" v-model.number=\"Sales_Price\" v-bind:class=\"{'invalid':SalesPriceError,'valid':!SalesPriceError}\" class=\"form-control\" length=\"4\" aria-label=\"Amount (to the nearest Rand)\">\n                            <span class=\"input-group-addon\">.00</span>\n                        </div>\n                        <hr />\n                        <div class=\"md-form\">\n                            <select class=\"mdb-select\" v-model=\"SalesCategory\">\n                                <optgroup label=\"Music\">\n                                    <option value=\"Album Launch\">Album Launch</option>\n                                    <option value=\"Artist Birthday\">Artist Birthday</option>\n                                </optgroup>\n                                <optgroup label=\"Fashion\">\n                                    <option value=\"Fashion Show\">Fashion Show</option>\n                                    <option value=\"Just Nje!\">Just Nje!</option>\n                                </optgroup>\n                            </select>\n                            <label>Event Type</label>\n                        </div>\n                    </div>\n                    <div class=\"col-md-6\">\n                            <div class=\"card narrower\">\n                                <div class=\"card-title\">\n                                    <div class=\"Post_Header row\">\n                                        <div class=\"Post_Header_Img col-xs-1 text-xs-left left\">\n                                            <img v-bind:src=\"LoggedInBrand.Logo\" style=\"width:100%;height:100%\" id=\"TheImage\" class=\"img-fluid\" />\n                                        </div>\n                                        <div class=\"Post_Header_Left col-xs-9 row\">\n                                            <div class=\"col-xs-12 text-xs-left\">\n                                                <h4 class=\"h4-responsive\"><a>{{ LoggedInBrand.Name }}</a></h4>\n                                            </div>\n                                            <div class=\"col-xs-12 text-xs-left\">\n                                                <span><a>{{ LoggedInBrand.Category }}</a></span> <i class=\"fa fa-dot-circle-o\"></i> {{ SalesCategory }} Event\n                                            </div>\n                                        </div>\n                                        <div class=\"Post_Header_Right col-xs-2 text-xs-right right\">\n                                            <div class=\"tag tag-danger\">NEW</div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"pull-xs-right\" style=\"border:1px solid black\">\n                                        <div style=\"width:20px;height:20px\" v-on:click=\"DescriptionText(false)\" class=\"white waves-effect col-xs-1\" role=\"button\"></div>\n                                        <div style=\"width:20px;height:20px\" v-on:click=\"DescriptionText(true)\" class=\"black waves-effect col-xs-1\" role=\"button\"></div> \n                                </div>\n                                <form class=\"range-field\">\n                                        <input id=\"TheZoomer\" type=\"range\" />\n                                </form>\n                                <a class=\"rotate-ccw ImageEdit btn-floating transparent waves-effect pull-xs-left\" onclick=\"{$('.image-editor').cropit('rotateCCW');}\"><i class=\"fa fa-rotate-left black-text\"></i></a>\n                                <a class=\"rotate-cw ImageEdit btn-floating transparent waves-effect pull-xs-right\" onclick=\"{$('.image-editor').cropit('rotateCW');}\"><i class=\"fa fa-rotate-right black-text\"></i></a>\n                                <div id=\"ThepicX\" v-bind:class=\"{'hm-white-strong':DescriptionTextColour,'hm-black-strong':!DescriptionTextColour}\" class=\"view hm-zoom overlay text-xs-center flex-center waves-effect\">\n                                    <img style=\"width:100%;height:100%\" class=\"img-fluid \" alt=\"\">\n                                    <div class=\"mask flex-center\">\n                                        <p v-bind:class=\"{'black-text':DescriptionTextColour,'white-text':!DescriptionTextColour}\">{{ Sales_Description }}</p>\n                                    </div>\n                                </div>\n                                          \n                                <div class=\"card-share\">\n                                    <div class=\"social-reveal\">\n                                        <a type=\"button\" class=\"btn-floating btn-fb\"><i class=\"fa fa-facebook\"></i></a>\n                                        <a type=\"button\" class=\"btn-floating btn-tw\"><i class=\"fa fa-twitter\"></i></a>\n                                        <a type=\"button\" class=\"btn-floating btn-gplus\"><i class=\"fa fa-instagram\"></i></a>\n                                    </div>\n                                    <a class=\"btn-floating btn-action share-toggle white\"><i class=\"fa fa-share-alt black-text\"></i></a>\n                                </div>\n                                <div class=\"card-link row Post_Footer\">\n                                    <div class=\"col-xs-3\">\n                                        <a class=\"btn btn-floating btn-small waves-effect waves-circle transparent activator\"><i class=\"fa fa-phone green-text animated tada infinite\"></i></a>\n                                    </div>\n                                    <div class=\"col-xs-6 center text-xs-center animated pulse infinite\">\n                                        <span class=\"center tag tag-danger\">\n                                            <span>R</span> {{ Sales_Price }}\n                                        </span>\n                                    </div>\n                                </div>\n                                    <div class=\"card-reveal\">\n                                        <div class=\"content text-xs-center\">\n                                               <h4 class=\"card-title\">Social shares <i class=\"fa fa-close\"></i></h4>\n                                            <hr>\n                                        </div>\n                                    </div>\n                                  </div>\n                              </div>\n                            </div>\n                            <div class=\"col-xs-12\">\n                                <a class=\"btn teal waves-effect waves-button export ImageEdit\" style=\"width:100%\" onclick=\"{ var imageData = $('.image-editor').cropit('export'); window.open(imageData); }\">Save Changes</a>\n                            </div>\n                        </div>\n                    </div>\n                    ",
    data: function () {
        return {
            post: PostCard,
            ShowAddSales: false,
            ShowEvent_Sales: false,
            SalesDescription: 'Describe your product...',
            SalesDescriptionError: false,
            SalesPrice: '0',
            SalesPriceError: '0',
            SalesCategory: '',
            SalesImage: '',
            LoggedInBrand: Brand,
            DescriptionTextColour: true
        };
    },
    computed: {
        Sales_Description: {
            get: function () {
                return this.SalesDescription;
            },
            set: function (val) {
                if (val.length > 20) {
                    this.SalesDescriptionError = true;
                }
                else if (val.length <= 0) {
                    this.SalesDescriptionError = true;
                }
                else {
                    this.SalesDescriptionError = false;
                    this.SalesDescription = val;
                }
            },
        },
        Sales_Price: {
            get: function () {
                return this.SalesPrice;
            },
            set: function (val) {
                if (val.length > 4) {
                    this.SalesPriceError = true;
                }
                else if (val.length <= 0) {
                    this.SalesPrice = 0;
                    this.SalesPriceError = true;
                }
                else {
                    this.SalesPriceError = false;
                    this.SalesPrice = val;
                }
            },
        }
    },
    mounted: function () {
        this.AttachCropIt();
        Initialize();
        this.LoggedInBrand = LoggedInBrand;
    },
    methods: {
        DescriptionText: function (color) {
            this.DescriptionTextColour = color;
        },
        AttachCropIt: function () {
            $('.image-editor').cropit({
                maxZoom: 2,
                imageBackground: true,
                imageState: {
                    src: '/Content/images/avatars/img (10).jpg',
                },
                smallImage: 'allow',
                width: 410,
                height: 290,
                freeMove: true,
                $preview: $('#ThepicX'),
                $zoomSlider: $('#TheZoomer'),
                onZoomDisabled: function () {
                    $('#TheZoomer').hide('slow');
                },
                onZoomEnabled: function () {
                    $('#TheZoomer').show('slow');
                }
            });
        }
    }
});
Vue.component('x-addEvent', {
    template: "\n                <div>\n                    <div class=\"row jumbotron animated rotateInDownLeft\">\n                        <div class=\"col-xs-12\">\n                            <div class=\"card\">\n                                <div class=\"col-xs-3\">\n                                    <div class=\"md-form form-group\">\n                                        <textarea class=\"md-textarea\" v-model=\"Event_Name\" v-bind:class=\"{'invalid':EventNameError,'valid':!EventNameError}\" length=\"20\"></textarea>\n                                    </div>\n                                    <hr />\n                                    <div class=\"md-form\">\n                                        <input placeholder=\"Select a date\" type=\"date\" v-model=\"EventDate\" class=\"form-control datepicker\">\n                                    </div>\n                                    <hr />\n                                    <div class=\"md-form input-group\">\n                                        <span class=\"input-group-addon\">R</span>\n                                        <input type=\"number\" v-model.number=\"Event_Price\" v-bind:class=\"{'invalid':EventPriceError,'valid':!EventPriceError}\" class=\"form-control\" length=\"4\" aria-label=\"Amount (to the nearest Rand)\">\n                                        <span class=\"input-group-addon\">.00</span>\n                                    </div>\n                                    <hr />\n                                    <div class=\"md-form\">\n                                        <select class=\"mdb-select\" v-model=\"EventCategory\">\n                                            <optgroup label=\"Music\">\n                                                <option value=\"Album Launch\">Album Launch</option>\n                                                <option value=\"Artist Birthday\">Artist Birthday</option>\n                                            </optgroup>\n                                            <optgroup label=\"Fashion\">\n                                                <option value=\"Fashion Show\">Fashion Show</option>\n                                                <option value=\"Just Nje!\">Just Nje!</option>\n                                            </optgroup>\n                                        </select>\n                                        <label>Event Type</label>\n                                    </div>\n                                </div>\n                                <div class=\"col-xs-6\">\n                                    <div class=\"card-wrapper\">\n                                        <div class=\"card-rotating effect__click\">\n                                            <div class=\"face front\">\n                                                <div class=\"card\">\n                                                    <div class=\"card-title\">\n                                                        <div class=\"Post_Header row\">\n                                                            <div class=\"Post_Header_Img col-xs-1 text-xs-left left\">\n                                                                <img v-bind:src=\"LoggedInBrand.Logo\" style=\"width:100%;height:100%\" class=\"img-fluid\" />\n                                                            </div>\n                                                            <div class=\"Post_Header_Left col-xs-9 row\">\n                                                                <div class=\"col-xs-12 text-xs-left\">\n                                                                    <h4 class=\"h4-responsive\"><a>{{ LoggedInBrand.Name }}</a></h4>\n                                                                </div>\n                                                                <div class=\"col-xs-12 text-xs-left\">\n                                                                    <span><a>{{ LoggedInBrand.Category }}</a></span> <i class=\"fa fa-dot-circle-o\"></i> {{ EventCategory }} Event\n                                                                </div>\n                                                            </div>\n                                                            <div class=\"Post_Header_Right col-xs-2 text-xs-right right\">\n                                                                <div class=\"tag tag-danger\">R{{Event_Price}}</div>\n                                                            </div>\n                                                        </div>\n                                                    </div>\n\n                                                    <div class=\"card-block text-xs-center\">\n                                                        <div class=\"view overlay hm-white-slight text-xs-center flex-center\">\n                                                            <h2 class=\"text-xs-center h2-responsive\">\n                                                                {{Event_Name}}\n                                                            </h2>\n                                                            <a>\n                                                                <div class=\"mask\"></div>\n                                                            </a>\n                                                        </div>\n                                                    </div>\n\n                                                    <div class=\"card-share\">\n                                                        <div class=\"social-reveal\">\n                                                            <a class=\"btn-floating btn-fb\"><i class=\"fa fa-facebook\"></i></a>\n                                                            <a class=\"btn-floating btn-tw\"><i class=\"fa fa-twitter\"></i></a>\n                                                            <a class=\"btn-floating btn-gplus\"><i class=\"fa fa-instagram\"></i></a>\n                                                        </div>\n                                                        <a class=\"btn-floating btn-action share-toggle white\"><i class=\"fa fa-share-alt black-text\"></i></a>\n                                                    </div>\n\n                                                    <div class=\"card-link row Post_Footer\">\n                                                        <div class=\"col-xs-3\">\n                                                            <a class=\"left btn btn-floating btn-small waves-effect waves-circle transparent activator\"><i class=\"fa fa-phone green-text animated tada infinite\"></i></a>\n                                                        </div>\n                                                        <div class=\"col-xs-6 text-xs-center\">\n                                                            <a class=\"left btn btn-info-outline btn-sm waves-effect rotate-btn\" id=\"BtnEventGoToLineup\" data-card=\"EventCard___Model.BrandID\">Line Up</a>\n                                                        </div>\n                                                        <div class=\"col-xs-3\">\n                                                            <br />\n                                                            <span class=\"center text-xs-center small comment-date Post_Body_Date\">{{EventDate}}</span>\n                                                        </div>\n                                                    </div>\n\n                                                    <div class=\"card-reveal\">\n                                                        <div class=\"content text-xs-center\">\n                                                            <h6 class=\"card-title\">Contact US<i class=\"fa fa-close\"></i></h6>\n                                                            <hr>\n                                                            <ul class=\"list-group\">\n                                                                <li class=\"list-group-item\">Facebook</li>\n                                                                <li class=\"list-group-item\">Twitter</li>\n                                                                <li class=\"list-group-item\">Instagram</li>\n                                                                <li class=\"list-group-item\">FBI Crew</li>\n                                                                <li class=\"list-group-item\">John Cena</li>\n                                                            </ul>\n                                                        </div>\n                                                    </div>\n                                                </div>\n                                            </div>\n                                            <div class=\"face back\">\n                                                <h6><i class=\"fa fa-map-marker\"></i> Makhuvha Stadium   <a class=\"rotate-btn right text-xs-right\" data-card=\"EventCard___Model.BrandID\"><i class=\"fa fa-close\"></i></a></h6>\n                                                <hr>\n                                                <ul class=\"list-group\" id=\"EventLineUp\" style=\"height:80%;overflow-y:scroll\">\n                                                    <li class=\"list-group-item\">\n                                                        <span class=\"tag transparent label-pill pull-xs-right\"><i class=\"fa fa-trash fa-2x red-text\"></i>Mizo Phyll</span>\n                                                    </li>\n                                                    <li class=\"list-group-item\">\n                                                        <span class=\"tag transparent label-pill pull-xs-right\"><i class=\"fa fa-trash fa-2x red-text\"></i>Racha Kill</span>\n                                                    </li>\n                                                </ul>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-xs-3\">\n                                    <div class=\"md-form form-group\">\n                                        <label for=\"TxtEventLineup\">Line Up</label>\n                                        <input v-on:keyup.enter=\"AddToLineup\" placeholder=\"+Artist\" v-model=\"TxtEventLineup\" id=\"TxtEventLineup\" class=\"md-textarea XBindable\" data-ParentDiv=\"#EventCard___Model.BrandID\" data-XBindie=\"#CurrentEventLineup\" length=\"20\" type=\"text\" />\n                                    </div>\n                                    <div class=\"row\">\n                                        <div class=\"chips col-xs-12\">\n                                            <div class=\"chip\" v-on:click=\"RemoveCurrentLineup(value)\" role=\"button\" v-for=\"value in Lineup\">\n                                                {{value}} <i class=\"close\"></i>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"col-xs-12\">\n                                <a class=\"btn teal waves-effect waves-button\" style=\"width:100%\">Save Changes</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>    \n            ",
    data: function () {
        return {
            TxtEventLineup: '',
            Lineup: ['Uzzie', 'Joe', 'Me'],
            post: PostCard,
            EventName: 'Name of event...',
            EventNameError: false,
            EventDate: '',
            EventPrice: '0',
            EventPriceError: '0',
            EventCategory: '',
            LoggedInBrand: Brand
        };
    },
    computed: {
        Event_Name: {
            get: function () {
                return this.EventName;
            },
            set: function (val) {
                if (val.length > 20) {
                    this.EventNameError = true;
                }
                else if (val.length <= 0) {
                    this.EventNameError = true;
                }
                else {
                    this.EventNameError = false;
                    this.EventName = val;
                }
            },
        },
        Event_Price: {
            get: function () {
                return this.EventPrice;
            },
            set: function (val) {
                if (val.length > 4) {
                    this.EventPriceError = true;
                }
                else if (val.length <= 0) {
                    this.EventPrice = 0;
                    this.EventPriceError = true;
                }
                else {
                    this.EventPriceError = false;
                    this.EventPrice = val;
                }
            },
        }
    },
    mounted: function () {
        $(window).resize();
        Initialize();
        this.LoggedInBrand = LoggedInBrand;
    },
    methods: {
        AddToLineup: function () {
            var value = this.TxtEventLineup;
            if (value.length > 2) {
                this.Lineup.push(value);
                this.TxtEventLineup = '';
            }
        },
        RemoveCurrentLineup: function (value) {
            var index = this.Lineup.indexOf(value);
            if (index >= 0) {
                this.Lineup.splice(index, 1);
            }
        },
    }
});
$(window).resize(function () {
    $('.card-wrapper').css('height', $('.card-wrapper').find('.card').css('height'));
});
$(document).ready(function () {
    //This is the Home page
    if ($('body[Home]').html() != undefined) {
    }
    else 
    //This is the Brand's Controller in general
    if ($('html').find('.BrandController').html() != undefined) {
        Vue.component('x-editevent-sales', {
            template: "<div>\n                    <div class=\"row card card-outline-success classic-admin-card\">\n                            <div class=\"col-xs-12\">\n                                <div class=\"card-block text-xs-center flex-center fullWidth\">\n                                    <a class=\"btn btn-flat waves-button waves-effect fullWidth\" v-bind:class=\"{'grey lighten-2':ShowEvent_SalesEdit}\" v-on:click=\"ShowEvent_SalesEditClick\"><span class=\"black-text\">Edit Existing Content</span></a>\n                                </div>\n                            </div>\n                            <div class=\"col-xs-12 row\" v-if=\"ShowEvent_SalesEdit\">\n                                <div class=\"col-xs-6 text-xs-center\">\n                                    <a class=\"btn btn-flat waves-button waves-effect\" v-bind:class=\"{'grey lighten-2':ShowEditEvent}\" v-on:click=\"ShowEditEventClick\">\n                                        <span class=\"black-text\">Event</span>\n                                    </a>\n                                </div>\n                                <div class=\"col-xs-6 text-xs-center\">\n                                    <a class=\"btn btn-flat waves-button waves-effect\" v-bind:class=\"{'grey lighten-2':ShowEditSales}\" v-on:click=\"ShowEditSalesClick\">\n                                        <span class=\"black-text\">Sales</span>\n                                    </a>\n                                </div>\n                            </div>\n                        </div>\n                 </div>",
            data: function () {
                return {
                    ShowEditEvent: false,
                    ShowEditSales: false,
                    ShowEvent_SalesEdit: false,
                };
            }, methods: {
                ShowEditSalesClick: function () {
                    this.ShowEditSales = !this.ShowEditSales;
                    this.ShowEditEvent = false;
                },
                ShowEvent_SalesEditClick: function () {
                    this.ShowEvent_SalesEdit = !this.ShowEvent_SalesEdit;
                },
                ShowEditEventClick: function () {
                    this.ShowEditEvent = !this.ShowEditEvent;
                    this.ShowEditSales = false;
                }
            }
        });
        Vue.component('x-socials', {
            template: "\n                         <div>\n                            <ul class=\"social-list z-depth-0 inline-ul row\">\n                                <li class=\"col-xs-2\"><a v-bind:href.once=\"e_socialEmailAddress\" class=\"icons-sm email-ic waves-effect socialsAnimate\"><i class=\"fa fa-envelope-o\"> </i> <span>Email</span></a></li>\n                                <li class=\"col-xs-2\"><a v-bind:href.once=\"e_socialFacebook\" class=\"icons-sm fb-ic waves-effect socialsAnimate\"><i class=\"fa fa-facebook\"></i> <span>Facebook</span></a></li>\n                                <li class=\"col-xs-2\"><a v-bind:href.once=\"e_socialTwitter\" class=\"icons-sm tw-ic waves-effect socialsAnimate\"><i class=\"fa fa-twitter\"></i> <span>Twitter</span></a></li>\n                                <li class=\"col-xs-2\"><a v-bind:href.once=\"e_socialInstagram\" class=\"icons-sm ins-ic waves-effect socialsAnimate\"><i class=\"fa fa-instagram\"> </i> <span>Instagram</span></a></li>\n                                <li class=\"col-xs-2\"><a v-bind:href.once=\"e_socialWebsite\" class=\"icons-sm yt-ic waves-effect socialsAnimate\"><i class=\"fa fa-globe prefix\"> </i><span>Website</span></a></li>\n                                <li class=\"col-xs-2\"></li>\n                            </ul>\n                        </div>\n          ",
            data: function () {
                return {};
            },
            props: ['e_socialEmailAddress', 'e_socialFacebook', 'e_socialInstagram', 'e_socialTwitter', 'e_socialWebsite'],
            mounted: function () {
                $('.socialsAnimate').find('span').hide();
                $('.socialsAnimate').mouseenter(function (e) {
                    $(e.currentTarget).find('span').show('fast');
                });
                $('.socialsAnimate').mouseleave(function (e) {
                    $(e.currentTarget).find('span').hide('fast');
                });
            }
        });
        Vue.component('x-addsomething', {
            template: "\n                <div>\n                    <div class=\"row text-xs-center transparent\">\n                        <div v-if=\"!isAdd && !isRemove && isStatus\" class=\"col-xs-4 col-md-4\">\n                            <div class=\"card card-block hoverable waves-effect grey lighten-1\" role=\"button\">\n                                <p class=\"text-xs-center flex-center\">\n                                    Status\n                                </p>\n                            </div>\n                        </div>\n                        <div v-if=\"!isRemove\" class=\"col-xs-4 col-md-4\" v-bind:class=\"{'col-xs-12 col-md-12':isAdd}\">\n                            <div class=\"card card-block\" v-bind:class=\"{'white lighten-1':isAdd,'hoverable waves-effect':!isAdd}\" role=\"button\">\n                                <div v-if=\"!isAdd\" class=\"fullSize X_text-Green\" v-on:click=\"isAdd = !isAdd\">\n                                    <h3 class=\"text-xs-center flex-center\">\n                                        Add\n                                    </h3>\n                                </div>\n                                <div v-else>\n                                    <div class=\"row\">\n                                        <div class=\"col-xs-12\">\n                                            <a class=\"pull-right close red-text\" v-on:click=\"isAdd = !isAdd;addSales = false;addEvent = false\"><i class=\"fa fa-close red-text\"></i></a>\n                                            <h2>Add post</h2>\n                                        </div>\n                                        <div class=\"col-xs-6\">\n                                            <a class=\"btn btn-success waves-effect black-text\" v-bind:class=\"{'z-depth-5':addEvent,'z-depth-0':!addEvent}\" v-on:click=\"addEvent = true;addSales = false;\">\n                                                Event\n                                            </a>\n                                        </div>\n                                        <div class=\"col-xs-6\">\n                                            <a class=\"btn btn-success waves-effect black-text\" v-bind:class=\"{'z-depth-5':addSales,'z-depth-0':!addSales}\" v-on:click=\"addSales = true;addEvent = false;\">\n                                                Sales\n                                            </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div v-if=\"!isAdd\" class=\"col-xs-4 col-md-4\" v-bind:class=\"{'col-xs-12 col-md-12':isRemove}\">\n                            <div class=\"card card-block\" v-bind:class=\"{'white lighten-1':isRemove,'hoverable waves-effect':!isRemove}\" role=\"button\">\n                                <div v-if=\"!isRemove\" class=\"fullSize red-text\" v-on:click=\"isRemove = !isRemove\">\n                                    <h3 class=\"text-xs-center flex-center\">\n                                        Remove\n                                    </h3>\n                                </div>\n                                <div v-else>\n                                    <div class=\"row\">\n                                       <div class=\"col-xs-12\">\n                                            <a class=\"pull-right close red-text\" v-on:click=\"isRemove = !isRemove;removeSales = false;removeEvent = false\"><i class=\"fa fa-close red-text\"></i></a>\n                                            <h2>Remove post</h2>\n                                        </div>\n                                        <div class=\"col-xs-6\">\n                                            <a class=\"btn btn-success waves-effect black-text\" v-bind:class=\"{'z-depth-5':removeEvent,'z-depth-0':!removeEvent}\" v-on:click=\"removeEvent = true;removeSales = false;\">\n                                                Event\n                                            </a>\n                                        </div>\n                                        <div class=\"col-xs-6\">\n                                            <a class=\"btn btn-success waves-effect black-text\" v-bind:class=\"{'z-depth-5':removeSales,'z-depth-0':!removeSales}\" v-on:click=\"removeSales = true;removeEvent = false;\">\n                                                Sales\n                                            </a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>  \n                        </div>\n                        <!--Status text -->\n                        <div v-if=\"!isAdd && !isRemove && isStatus\" class=\"row\">\n                            <div class=\"col-xs-12 col-md-8 offset-md-2\">\n                                <div class=\"card card-block grey lighten-5\">\n                                    <div class=\"row\">\n                                        <div class=\"col-xs-6 green-text\">\n                                            <label>Current status</label>\n                                        </div>\n                                        <div class=\"col-xs-6 pull-right text-xs-right\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"Today\" role=\"button\">\n                                            <i class=\"fa fa-clock-o\"></i>\n                                            <span class=\"small small-tag\">\n                                                <label>12:10 </label>\n                                            </span>\n                                        </div>\n                                        <div class=\"col-xs-12 text-xs-center\">\n                                            <p class=\"card-text fullWidth\">\n                                                <textarea id=\"txtStatus\" class=\"md-textarea\" v-bind:class=\"{'red-text':txtStatusCounter < 0}\" length=\"100\" v-model=\"txtStatus\"></textarea>\n                                                <label for=\"txtStatus\">Update current situation</label>\n                                            </p>\n                                        </div>\n                                        <hr style=\"width:100%\" />\n                                        <div class=\"col-xs-12\">\n                                            <label class=\"text-xs-right pull-right small\">\n                                                <sup>{{ txtStatusCounter }}</sup>\n                                            </label>\n                                            <a class=\"btn btn-success fullWidth\" v-on:click=\"UpdateStatus\" v-bind:class=\"{'disabled':txtStatusCounter < 0}\">Update</a>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"col-xs-12 col-sm-10 offset-sm-1\">\n                                <br />\n                                <x-addSales v-if=\"addSales\"></x-addSales>\n                                <x-addEvent v-if=\"addEvent\"></x-addEvent>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                        ",
            data: function () {
                return {
                    isStatus: true,
                    isAdd: false,
                    isRemove: false,
                    addSales: false,
                    addEvent: false,
                    removeSales: false,
                    removeEvent: false,
                    txtStatusCounter: 100,
                    brandStatus: ''
                };
            },
            methods: {
                UpdateStatus: function () {
                    this.txtStatus;
                    $.ajax({
                        url: '/brand/r/UpdateStatus?Message=' + this.txtStatus,
                        success: function (answer) {
                            if (answer == "done") {
                                toastr.success("Status updated");
                            }
                            else {
                                toastr.error(answer);
                            }
                        },
                        error: function () {
                            toastr.error("System error : ghiweojpfq39t208uhvk");
                        }
                    });
                }
            },
            computed: {
                txtStatus: {
                    get: function () {
                        return this.brandStatus;
                    },
                    set: function (val) {
                        this.txtStatusCounter = (100 - val.length);
                        if (this.txtStatusCounter > 0) {
                            this.brandStatus = val;
                        }
                    },
                }
            }
        });
        Vue.component('x-editbrand', {
            template: "\n           <div>\n                <div class=\"row text-xs-center transparent\">\n                    <div class=\"col-xs-4\">\n                        <a class=\"btn waves-effect lighten-2\" v-bind:class=\"{'black':settingGeneral,'red btn-flat':!settingGeneral}\" v-on:click=\"showSetting('settingGeneral')\">General</a>\n                    </div>\n                    <div class=\"col-xs-4\">\n                        <a class=\"btn waves-effect lighten-2\" v-bind:class=\"{'black':settingSocialMedia,'red btn-flat':!settingSocialMedia}\" v-on:click=\"showSetting('settingSocialMedia')\">Social Media</a>\n                    </div>\n                    <div class=\"col-xs-4\">\n                        <a class=\"btn waves-effect lighten-2\" v-bind:class=\"{'black':settingDeletePosts,'red btn-flat':!settingDeletePosts}\" v-on:click=\"showSetting('settingDeletePosts')\">Delete Posts</a>\n                    </div>\n                </div>\n\n\n                <div class=\"row card\" v-if=\"settingSocialMedia\">\n                    <div class=\"col-xs-6 offset-xs-3 row\">\n                        <h3 class=\"card-title text-xs-center h3-responsive\">\n                            Social Media\n                        </h3>\n                        <div class=\"col-xs-12 md-form input-group\">\n                            <i class=\"fa fa-envelope grey-text prefix\"></i>\n                            <input type=\"text\" placeholder=\"Email Address\" v-model=\"socialEmailAddress\" />\n                        </div>\n                        <div class=\"col-xs-12 md-form input-group\">\n                            <i class=\"fa fa-facebook-f fb-ic prefix\"></i>\n                            <input type=\"text\" placeholder=\"Facebook Page/Profile Link\" v-model=\"socialFacebook\"/>\n                        </div>\n                        <div class=\"col-xs-12 md-form input-group\">\n                            <i class=\"fa fa-twitter tw-ic prefix\"></i>\n                            <input type=\"text\" placeholder=\"Twitter Profile Link\" v-model=\"socialTwitter\" />\n                        </div>\n                        <div class=\"col-xs-12 md-form input-group\">\n                            <i class=\"fa fa-instagram ins-ic prefix\"></i>\n                            <input type=\"text\" placeholder=\"Instagram Profile Link\" v-model=\"socialInstagram\"/>\n                        </div>\n                        <div class=\"col-xs-12 md-form input-group\">\n                            <i class=\"fa fa-globe yt-ic prefix\"></i>\n                            <input type=\"text\" placeholder=\"Website Link\" v-model=\"socialWebsite\" />\n                        </div>\n                        <div class=\"col-xs-12\">\n                            <a class=\"btn btn-large teal waves-effect waves-button\" style=\"width:100%\">Save Changes</a>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row card\" v-if=\"settingDeletePosts\">\n                    <div class=\"col-xs-6 offset-xs-3 row\">\n                        <h3 class=\"card-title text-xs-center h3-responsive\">\n                            Delete Posts\n                        </h3>\n                        <div class=\"col-xs-12 row\">\n                            <div class=\"col-xs-6 text-xs-center\">\n                                <a class=\"btn waves-button waves-effect red lighten-2\">\n                                    <span class=\"black-text\">Events</span>\n                                </a>\n                            </div>\n                            <div class=\"col-xs-6 text-xs-center\">\n                                <a class=\"btn waves-button waves-effect red lighten-2\">\n                                    <span class=\"black-text\">Sales</span>\n                                </a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"row card\" v-if=\"settingGeneral\">\n                    <div class=\"col-xs-6 offset-xs-3 row\">\n                        <h3 class=\"card-title text-xs-center h3-responsive\">\n                            General\n                        </h3>\n                        <div class=\"col-xs-12 md-form input-group\">\n                            <textarea id=\"TxtBio\" class=\"md-textarea active\" v-model=\"generalBio\"></textarea>\n                            <label for=\"TxtBio\">Bio</label>\n                        </div>\n                        <div class=\"col-xs-12 md-form input-group\">\n                            <textarea id=\"TxtHomeAddress\" class=\"md-textarea\" v-model=\"generalHomeAddress\"></textarea>\n                            <label for=\"TxtHomeAddress\">Home address</label>\n                        </div>\n\n                        <div class=\"col-xs-12\">\n                            <a class=\"btn teal waves-effect waves-button\" v-on:click=\"changeBioHomeaddress\" style=\"width:100%\">Save Changes</a>\n                        </div>\n\n                        <div class=\"col-xs-6 offset-xs-3 md-form form-group\">\n                            <input type=\"checkbox\" v-model=\"generalChangePassword\" id=\"ChangePassword\" />\n                            <label for=\"ChangePassword\">Change Password</label>\n                        </div>\n\n                        <div v-if=\"generalChangePassword\"> \n                            <div class=\"col-xs-6 offset-xs-3 md-form form-group\">\n                                <i class=\"fa fa-lock prefix\"></i>\n                                <input placeholder=\"Current Password\" id=\"OldPassword\" type=\"password\" />\n                            </div>\n                        \n                            <div class=\"col-xs-12 row md-form card card-block\" v-if=\"\">\n                                <div class=\"col-xs-6 md-form form-group\">\n                                    <i class=\"fa fa-lock prefix\"></i>\n                                    <input id=\"NewPassword\" type=\"password\" />\n                                    <label for=\"NewPassword\">New Password</label>\n                                </div>\n                                <div class=\"col-xs-6 md-form form-group\">\n                                    <i class=\"fa fa-lock prefix\"></i>\n                                    <input id=\"ConfirmNewPassword\" type=\"password\" />\n                                    <label for=\"ConfirmNewPassword\">Retype Password</label>\n                                </div>\n                                <div class=\"col-xs-12 text-xs-center\">\n                                    <x-loading v-if=\"passwordLoading\"></x-loading>\n                                    <span class=\"red-text\">{{ passwordChangeError }}</span>\n                                </div>\n                                <div class=\"col-xs-12\">\n                                    <a class=\"btn teal waves-effect waves-button\" v-on:click=\"changePasswordSaveChanges\" style=\"width:100%\">Save Passwords</a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n   ",
            data: function () {
                return {
                    settingGeneral: false,
                    settingDeletePosts: false,
                    settingSocialMedia: true,
                    socialEmailAddress: '',
                    socialFacebook: '',
                    socialInstagram: '',
                    socialTwitter: '',
                    socialWebsite: '',
                    generalChangePassword: false,
                    generalBio: '',
                    generalHomeAddress: '',
                    passwordChangeError: '',
                    passwordLoading: false
                };
            },
            mounted: function () {
                this.socialEmailAddress = this.e_socialEmailAddress;
                this.socialFacebook = this.e_socialFacebook;
                this.socialInstagram = this.e_socialInstagram;
                this.socialTwitter = this.e_socialTwitter;
                this.socialWebsite = this.e_socialWebsite;
                this.generalBio = this.e_generalBio;
                this.generalHomeAddress = this.e_generalHomeAddress;
            },
            props: ['e_generalBio', 'e_generalHomeAddress', 'e_socialEmailAddress', 'e_socialFacebook', 'e_socialInstagram', 'e_socialTwitter', 'e_socialWebsite'],
            methods: {
                showSetting: function (value) {
                    if (value == 'settingGeneral') {
                        this.settingGeneral = true;
                        this.settingDeletePosts = false;
                        this.settingSocialMedia = false;
                    }
                    if (value == 'settingDeletePosts') {
                        this.settingDeletePosts = true;
                        this.settingGeneral = false;
                        this.settingSocialMedia = false;
                    }
                    if (value == 'settingSocialMedia') {
                        this.settingSocialMedia = true;
                        this.settingGeneral = false;
                        this.settingDeletePosts = false;
                    }
                },
                changeBioHomeaddress: function () {
                    if (this.generalBio.length < 3) {
                        toastr.error("Bio too short!");
                        return;
                    }
                    if (this.generalHomeAddress.length < 3) {
                        toastr.error("Address too short!");
                        return;
                    }
                    var self = this;
                    $.ajax({
                        url: '/brand/r/changedetails?Bio=' + self.generalBio + '&homeAddress=' + self.generalHomeAddress,
                        success: function (answer) {
                            if (answer == 'done') {
                                toastr.success("Changes saved!");
                            }
                            else {
                                toastr.error(answer);
                            }
                        }
                    });
                },
                changePasswordSaveChanges: function () {
                    this.passwordChangeError = "";
                    this.passwordLoading = true;
                    var oldpass = $('#OldPassword').val();
                    var pass = $('#NewPassword').val();
                    if (oldpass.length < 3) {
                        this.passwordChangeError = "Incorrect current password";
                        this.passwordLoading = false;
                        return;
                    }
                    if (pass.length < 3) {
                        this.passwordChangeError = "Password too short";
                        this.passwordLoading = false;
                        return;
                    }
                    if ($('#ConfirmNewPassword').val() != $('#NewPassword').val()) {
                        this.passwordChangeError = "Passwords do not match";
                        this.passwordLoading = false;
                        return;
                    }
                    var self = this;
                    $.ajax({
                        url: '/brand/r/ChangePassword?Old=' + oldpass + '&New=' + pass,
                        success: function (answer) {
                            self.passwordLoading = false;
                            if (answer == "done") {
                                toastr.success('Password changed!', 'Success');
                            }
                            else {
                                self.passwordChangeError = answer;
                                return;
                            }
                        }
                    });
                }
            }
        });
    }
    new Vue({
        el: '#Xapp',
        data: {
            LoginBrandname: '',
            LoginBrandlogo: '',
            LoginBrandNameFound: false,
            eventPost: PostCard,
            PostFound: false
        },
        methods: {},
        mounted: function () {
            var _this = this;
            //Call the resize method
            $(window).resize();
            //Initialize WOW
            new WOW().init();
            //Initialize 
            $.ajax({
                method: 'POST',
                url: "/Brand/r/IsLoggedInBrand",
                success: function (answer) {
                    if (answer.indexOf("Error") >= 0) {
                    }
                    else {
                        var brand = JSON.parse(answer);
                        _this.LoginBrandname = brand.brand.Name;
                        _this.LoginBrandlogo = brand.brand.Logo;
                        _this.LoginBrandNameFound = true;
                        _this.LogInFailedText = '';
                        _this.LogInFailed = false;
                        if (!brand.LoggedIn) {
                            $('#modal-login').modal();
                        }
                        LoggedInBrand = new Brand(brand.brand.ID, brand.brand.Name, brand.brand.Logo);
                        //Initialize tooltips
                        $('[data-toggle="tooltip"]').tooltip();
                        $('[data-toggle="popover"]').popover({
                            html: true,
                            placement: "top",
                            title: _this.LoginBrandname,
                            template: "\n                            <div class=\"popover\" style=\"padding-left:20px\" role=\"tooltip\">\n                               <div class=\"popover-arrow\"></div>\n                               <a href=\"/Brand/" + _this.LoginBrandname + "\"><h1 class=\"popover-title text-xs-center\"></h1></a>\n                               <div class=\"list-group z-depth-0\" style=\"width:100%\">\n                                    <a class=\"list-group-item waves-effect\"  href=\"/Brand/" + _this.LoginBrandname + "/edit\">\n                                          <span class=\"pull-xs-right\">Edit Profile</span>\n                                    </a>\n                                    <a class=\"list-group-item waves-effect\">\n                                          <span class=\"pull-xs-right\">Report Spam</span>\n                                    </a>\n                                    <a class=\"list-group-item waves-effect\">\n                                          <span class=\"pull-xs-right\">Sattle Account</span>\n                                    </a>\n                                    <a class=\"list-group-item waves-effect\" role=\"button\" onclick=\"LogOut('" + _this.LoginBrandname + "')\">\n                                         <span class=\"pull-xs-right\">LogOut</span>\n                                    </a>\n                                </div>\n                            </div>\n                         ",
                        });
                    }
                }
            });
        }
    });
});
//# sourceMappingURL=BrandSquare.js.map