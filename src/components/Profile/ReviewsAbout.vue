<template>
    <div>
        <div
            class="w-full flex flex-col border border-gray-400 rounded-sm mt-10"
        >
            <div
                class="bg-gray-300 py-3 px-5 font-light border-b border-gray-400"
            >
                Past Reviews
            </div>
            <div class="py-4 px-5 bg-white">
                <div class="font-light mb-5">
                    Reviews are written at the end of a reservation through
                    Workcation. Reviews you’ve received will be visible both
                    here and on your public profile.
                </div>
                <div v-for="(review, index) in reviews" :key="index">
                    <div class="flex items-start">
                        <div class="flex-none w-16 text-center mr-4">
                            <img
                                class="w-16 h-16 rounded-full mr-4"
                                :src="review.reviewer_photo"
                                alt="Avatar"
                            />
                            <div
                                class="text-gray-600 font-thin leading-tight mt-1"
                            >
                                {{ review.reviewer_name }}
                            </div>
                        </div>
                        <div class="flex-shrink text-sm">
                            <p class="font-light text-sm leading-none">
                                {{ review.content }}
                            </p>
                            <hr
                                class="my-4 border-gray-300"
                                v-show="review.private_feedback"
                            />
                            <div class="font-light text-sm leading-none">
                                <div
                                    class="flex items-center mb-1"
                                    v-show="review.private_feedback"
                                >
                                    <svg
                                        class="h-3 mr-1 text-gray-600 fill-current"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z"
                                        />
                                    </svg>
                                    <span class="font-semibold"
                                        >Private feedback:</span
                                    >
                                </div>
                                <p v-show="review.private_feedback">
                                    {{ review.private_review_content }}
                                </p>
                                <div class="font-thin text-gray-600 mt-3">
                                    {{ review.date }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-8" v-show="index != reviews.length - 1" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['reviews'],
}
</script>
