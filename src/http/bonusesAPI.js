import axios from "axios"

export const getUserInfo = async (name, setBonuses, setReferrals) => {
    const resp = await axios.get(`http://localhost:5000/api/user/get${name}`)
    const { bonuses, referrals } = resp.data
    setBonuses(bonuses)
    setReferrals(referrals.length)
}
