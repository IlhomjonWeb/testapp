<template>
    <section>
        <div class="Weather-site-logo">
            <img src="../assets/images/Logo.png" alt="">
            <h3 class="logo">vue weather</h3>
        </div>
        <div class="Weather-site-search">
            <form @submit.prevent> <!-- Prevent form submission -->
                <button type="button" @click="toggleMode">
                    <img src="../assets/images/DarkMod.svg" alt="">
                </button>
                <input v-model="Countr" type="text" placeholder="Search Country..." @input="sendToParent" />
            </form>
        </div>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isDarkMode: false, // Default to light mode
            Countr: ''
        };
    },
    methods: {
        toggleMode() {
            this.isDarkMode = !this.isDarkMode;
            this.$emit('update-dark-mode', this.isDarkMode);
        },
        sendToParent() {
            this.$emit('country-selected', this.Countr); // Emit the current country value to the parent
        },
    },
}
</script>

<style scoped>
section {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0px 30px 0px;
}

.dark section {
    background-color: black;
}

@media (max-width: 930px) {
    section {
        display: flex;
        flex-direction: column;
    }

    .Weather-site-logo {
        margin-bottom: 15px;
    }
}

.Weather-site-logo {
    display: flex;
    align-items: center;
}

.Weather-site-logo .logo {
    font-size: 25px;
    font-weight: 700;
    line-height: 30.48px;
    text-align: left;
    color: #4793FF;
    text-transform: uppercase;
    margin-left: 20px;
}

.Weather-site-search form {
    display: flex;
    align-items: center;
}

.Weather-site-search form input {
    width: 194px;
    height: 37px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 10px;
    background: #4793FF33;
    border: none;
    padding-left: 20px;
    margin-left: 20px;
}

.dark .Weather-site-search form input::placeholder {
    color: white;
}

.Weather-site-search form button {
    border: none;
    background-color: transparent;
}
</style>
