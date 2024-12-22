import { useSearchLocation } from "@/weatherForecast/core/apis/mutations/useSearchLocation";
import { LocationData } from "@/weatherForecast/types/models/Location";
import { useFormik } from "formik"
import { Option, SearchLocation } from "./SearchLocation";
import { FC, useState } from "react";
import { useTranslations } from "next-intl";

interface LocationSearchProps {
    setLocation: (location: LocationData) => void;
}

export const LocationSearch: FC<LocationSearchProps> = ({ setLocation }) => {
    const t = useTranslations()
    const searchLocation = useSearchLocation()
    const [selectedOption, setSelectedOption] = useState<string>('')
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [locationsOptions, setLocationsOptions] = useState<Option[]>([])
    const handleChange = (value: string) => {
        const location = JSON.parse(value) as LocationData;
        setLocation(location)
        setSelectedOption(value)
        setSearchTerm('');
    }

    const handleSearch = (query: string) => {
        searchLocation.mutate(query, {
            onSuccess(data, variables, context) {
                const locationOptionsArray: Array<Option> = data == undefined ? [] : data.data.results.map(loc => ({
                    label: [loc.components.continent, loc.components.country, loc.components.state, loc.components.city].join(", "),
                    value: JSON.stringify({ lat: loc.geometry.lat, lon: loc.geometry.lng })
                }))
                setLocationsOptions(locationOptionsArray)

            },
            onError(error, variables, context) {

            },
        })
        setSearchTerm(query);
    }

    return (
        <div className="">
            <SearchLocation
                searchTerm={searchTerm}
                onSearch={handleSearch}
                onChange={handleChange}
                options={locationsOptions}
                value={selectedOption}
                placeholder={t("search_city")}
                loading={searchLocation.isLoading}
            />
        </div>
    )
}