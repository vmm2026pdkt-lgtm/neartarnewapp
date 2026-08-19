import Header from '../../components/layout/Header'
import ActionButtons from '../../components/buttons/ActionButtons'
import SearchBar from '../../components/search/SearchBar'
import CategoryGrid from '../../components/cards/CategoryGrid'
import FeaturedBusinesses from '../../components/cards/FeaturedBusinesses'
import LatestProducts from '../../components/cards/LatestProducts'
import RequirementsSection from '../../components/cards/RequirementsSection'
import AdBanner from '../../components/common/AdBanner'
import BottomNav from '../../components/navbar/BottomNav'

export default function Home() {
  return (
    <div className="min-h-screen bg-bg pb-20">
      <Header />
      <ActionButtons />
      <SearchBar />
      <CategoryGrid />
      <FeaturedBusinesses />
      <LatestProducts />
      <RequirementsSection />
      <AdBanner />
      <BottomNav />
    </div>
  )
}
