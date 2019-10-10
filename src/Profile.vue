<template>
    <div class="oped" v-if="user.spokenLanguages">
        <Navigation :profileImage="user.profileImage" :isHost="!!user.host" />

        <div class="md:px-64 pt-20 bg-gray-200">
            <div class="flex text-gray-800">
                <div class="w-1/3">
                    <div
                        class="w-9/12 flex flex-col bg-white border rounded shadow"
                    >
                        <div class="px-4 py-2 m-2">
                            <img
                                class="w-16 h-16 md:h-24 md:w-24 rounded-full mx-auto"
                                :src="user.profileImage"
                                alt="Avatar"
                            />
                            <div class="text-center mt-3">
                                <a class="text-indigo-600 hover:text-indigo-200"
                                    >Update photo</a
                                >
                            </div>
                        </div>
                        <hr class="mx-5" />
                        <div class="px-4 py-2 m-2">
                            <a
                                class="flex items-center text-indigo-600 hover:text-indigo-200"
                                @click="scrollTo('profile-reviews')"
                            >
                                <svg
                                    class="h-4 mr-2 text-gray-700 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"
                                    />
                                </svg>
                                <span class="font-thin">{{
                                    pluralize('review', user.reviews, true)
                                }}</span>
                            </a>

                            <router-link to="/profile" v-show="user.verified">
                                <a
                                    class="flex items-center text-indigo-600 hover:text-indigo-200"
                                >
                                    <svg
                                        class="h-4 mr-2 text-gray-700 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M10 12a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-3a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm4 2.75V20l-4-4-4 4v-8.25a6.97 6.97 0 0 0 8 0z"
                                        />
                                    </svg>
                                    <span class="font-thin">Verified</span>
                                </a>
                            </router-link>
                        </div>
                        <hr class="mx-5" />
                        <div class="px-4 py-2 m-2" v-show="user.verified">
                            <div class="font-semibold mb-4">
                                {{ user.username }} provided
                            </div>
                            <div
                                class="flex items-center mb-2"
                                v-show="user.identification"
                            >
                                <svg
                                    class="h-4 mr-2 text-gray-700 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
                                    />
                                </svg>
                                <span class="font-thin"> Government ID</span>
                            </div>
                            <div
                                class="flex items-center mb-2"
                                v-show="user.email_verified"
                            >
                                <svg
                                    class="h-4 mr-2 text-gray-700 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
                                    />
                                </svg>
                                <span class="font-thin"> Email address</span>
                            </div>
                            <div
                                class="flex items-center"
                                v-show="user.mobile_verified"
                            >
                                <svg
                                    class="h-4 mr-2 text-gray-700 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
                                    />
                                </svg>
                                <span class="font-thin"> Phone number</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-2/3 mb-20">
                    <div class="flex flex-col bg-white border rounded shadow">
                        <div class="px-4 py-2 mx-2 my-6">
                            <div class="text-5xl font-light">
                                Hi, I'm {{ user.username }}
                            </div>
                            <div class="font-light text-md -mt-1">
                                Joined {{ dateJoined.getFullYear() }}
                                <span v-show="!editOn"
                                    >&bull;
                                    <a
                                        class="cursor-pointer text-indigo-600 hover:text-indigo-200"
                                        @click="toggleEdit"
                                        >Edit profile</a
                                    >
                                </span>
                            </div>
                            <Summary
                                :about="user.about"
                                :location="user.location"
                                :languages="user.spokenLanguages"
                                :work="user.work"
                                v-show="!editOn"
                            />
                            <EditSummary
                                @cancel-edit-profile="toggleEdit"
                                @update-profile="updateProfile"
                                :initialAbout="user.about"
                                :initialLocation="user.location"
                                :initialLanguages="user.spokenLanguages"
                                :initialWork="user.work"
                                v-show="editOn"
                            />
                        </div>
                        <hr class="mx-5" v-show="user.host" />
                        <div class="px-4 py-2 mx-2 my-6" v-show="user.host">
                            <div class="font-semibold text-2xl mb-6">
                                {{ user.first_name }}'s Listings
                            </div>
                            <ListingsSlide :listings="listings" />
                        </div>
                        <hr class="mx-5" />
                        <div class="px-4 py-2 mx-2 my-6" id="profile-reviews">
                            <div class="font-semibold text-2xl mb-6">
                                {{ pluralize('review', user.reviews, true) }}
                            </div>
                            <div
                                class=""
                                v-for="(review, index) in reviews"
                                :key="index"
                            >
                                <div
                                    class="text-xs font-semibold mb-4 tracking-normal"
                                >
                                    {{ review.date }}
                                </div>
                                <div class="font-light mb-4">
                                    {{ review.content }}
                                </div>
                                <div class="flex items-center">
                                    <img
                                        class="w-10 h-10 rounded-full mr-4"
                                        :src="review.reviewer_photo"
                                        alt="Avatar"
                                    />
                                    <div class="text-sm">
                                        <p
                                            class="font-semibold text-sm leading-none mb-1"
                                        >
                                            {{ review.reviewer_title }}
                                        </p>
                                        <p
                                            class="text-gray-600 font-thin text-xs"
                                        >
                                            Joined in
                                            {{ review.reviewer_joined }}
                                        </p>
                                    </div>
                                </div>
                                <hr
                                    class="my-6"
                                    v-show="index != reviews.length - 1"
                                />
                            </div>
                        </div>
                        <hr class="mx-5" />
                        <div class="px-4 py-2 mx-2 my-6">
                            <router-link to="/profile/reviews">
                                <a class="text-indigo-600 hover:text-indigo-200"
                                    >Reviews by you</a
                                ></router-link
                            >
                        </div>
                        <hr class="mx-5" />
                        <div class="px-4 py-2 mx-2 my-6">
                            <a
                                class="text-indigo-600 hover:text-indigo-200"
                                :class="{
                                    'cursor-pointer': !complaintLodged,
                                    'opacity-50 cursor-not-allowed': complaintLodged,
                                }"
                                @click="toggleReportModal"
                                >Report this profile</a
                            >
                            <div
                                class="text-xs font-semibold tracking-widest leading-tight text-indigo-500"
                                v-if="complaintLodged"
                            >
                                Your report is on its way to our admins.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <BackButton />

        <Footer />

        <ReportModal
            :report-url="'/user/' + user.id + '/report'"
            :modal-on="reportModalOn"
            :perp="user.first_name"
            v-if="reportModalOn"
            @close-report-modal="toggleReportModal"
            @complaint-lodged="userFeedback"
        />
    </div>
</template>

<script>
import Pluralize from 'pluralize'

import Navigation from './components/Navigation.vue'
import Summary from './components/Profile/Summary.vue'
import EditSummary from './components/Profile/EditSummary.vue'
import ListingsSlide from './components/Profile/ListingsSlide'
import BackButton from './components/BackButton'
import ReportModal from './components/Profile/ReportModal'
import Footer from './components/Footer'

export default {
    components: {
        Navigation,
        Summary,
        EditSummary,
        BackButton,
        ListingsSlide,
        ReportModal,
        Footer,
    },
    data() {
        return {
            user: {},
            editOn: false,
            reviews: [],
            listings: [],
            reportModalOn: false,
            complaintLodged: false,
        }
    },
    computed: {
        dateJoined() {
            if (!this.user.hasOwnProperty('created_at')) return new Date()

            var dateTime = this.user.created_at.split(' ')

            var date = dateTime[0].split('-')
            var yyyy = date[0]
            var mm = date[1] - 1
            var dd = date[2]

            var time = dateTime[1].split(':')
            var h = time[0]
            var m = time[1]
            var s = parseInt(time[2]) //get rid of that 00.0;

            return new Date(yyyy, mm, dd, h, m, s)
        },
    },
    methods: {
        fetchProfile() {
            this.$http
                .get('/user/profile', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            'token'
                        )}`,
                    },
                })
                .then(
                    res => {
                        this.user = res.data.user
                        this.reviews = res.data.reviews
                        this.listings = res.data.listings
                    },
                    error => {
                        console.log(error)
                    }
                )
        },
        scrollTo(hash) {
            location.hash = '#' + hash
        },
        toggleEdit() {
            this.editOn = !this.editOn
        },
        toggleReportModal() {
            this.reportModalOn = !this.reportModalOn
        },
        updateProfile(user) {
            this.user = user

            this.toggleEdit()
        },
        pluralize(word, count = 0, inclusive) {
            return Pluralize(word, count, inclusive)
        },
        userFeedback() {
            this.complaintLodged = !this.complaintLodged

            this.toggleReportModal()
        },
    },
    created() {
        if (!this.$store.state.isLogged) {
            window.history.length > 1
                ? this.$router.go(-1)
                : this.$router.push('/')
        } else {
            this.fetchProfile()
        }
    },
}
</script>
