// localStorage utilities for persisting analysis history

const STORAGE_KEY = 'placement_analysis_history'

/**
 * Validate analysis entry has required fields
 */
function isValidEntry(entry) {
    return entry &&
        typeof entry.id === 'string' &&
        typeof entry.createdAt === 'string' &&
        typeof entry.jdText === 'string' &&
        typeof entry.extractedSkills === 'object'
}

/**
 * Get all analysis entries from localStorage
 * Filters out corrupted entries gracefully
 */
export function getAnalysisHistory() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return []

        const allEntries = JSON.parse(stored)

        // Filter valid entries and log corrupted ones
        const validEntries = allEntries.filter(entry => {
            const isValid = isValidEntry(entry)
            if (!isValid) {
                console.warn('Skipping corrupted entry:', entry?.id || 'unknown')
            }
            return isValid
        })

        // If we filtered out corrupted entries, save the clean list
        if (validEntries.length !== allEntries.length) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(validEntries))
        }

        return validEntries
    } catch (error) {
        console.error('Error reading from localStorage:', error)
        return []
    }
}

/**
 * Save a new analysis entry to localStorage
 */
export function saveAnalysisEntry(entry) {
    try {
        const history = getAnalysisHistory()

        // Add new entry with unique ID and timestamp
        const newEntry = {
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            ...entry
        }

        // Add to beginning of array (most recent first)
        history.unshift(newEntry)

        // Limit to 50 entries to prevent localStorage overflow
        const limitedHistory = history.slice(0, 50)

        localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedHistory))

        return newEntry
    } catch (error) {
        console.error('Error saving to localStorage:', error)
        throw error
    }
}

/**
 * Get a specific analysis entry by ID
 */
export function getAnalysisById(id) {
    const history = getAnalysisHistory()
    return history.find(entry => entry.id === id)
}

/**
 * Delete an analysis entry by ID
 */
export function deleteAnalysisEntry(id) {
    try {
        const history = getAnalysisHistory()
        const filtered = history.filter(entry => entry.id !== id)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
        return true
    } catch (error) {
        console.error('Error deleting from localStorage:', error)
        return false
    }
}

/**
 * Clear all analysis history
 */
export function clearAnalysisHistory() {
    try {
        localStorage.removeItem(STORAGE_KEY)
        return true
    } catch (error) {
        console.error('Error clearing localStorage:', error)
        return false
    }
}

/**
 * Get the most recent analysis entry
 */
export function getLatestAnalysis() {
    const history = getAnalysisHistory()
    return history.length > 0 ? history[0] : null
}
